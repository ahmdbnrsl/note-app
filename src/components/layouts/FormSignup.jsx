import { useState, useEffect } from 'react';
import sign from 'jwt-encode';
import { jwtDecode } from 'jwt-decode';
import Input from '.././fragments/Inputs.jsx';
import Button from '.././elements/Button.jsx';
import Loading from '.././elements/Loading.jsx'
import { getUser, addUser } from '../.././service/db.service.js'

export default () => {
  const _ = (elements) => document.querySelector(elements);
  const secret = 'secret';
  const [success, setSuccess] = useState('');
  const [loginFailed, setLoginFailed] = useState('');
  const HandleChange = () => {
    if(_('.confirm').value !== _('.password').value) {
      setLoginFailed('confirm password is not suitable');
    } else {
      setLoginFailed('');
    }
  }
  useEffect(() => {
    document.addEventListener('invalid', (() => {
      return (e) => {
        e.preventDefault();
        if (_(".username").value === '' || _('.username').value.length < 4) {
          _(".username").focus();
        } else if (_(".password").value === '' || _('.password').value.length < 4) {
          _(".password").focus();
        } else if (_(".confirm").value !== _('.password').value) {
          _(".confirm").focus();
        }
      };
    })(), true);
  }, []);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (_('.confirm').value === _('.password').value && e.target.username.value !== '' && e.target.password.value !== '') {
      const userInfo = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      const userInfoEnc = sign(userInfo, secret)
      _('.submiter').classList.toggle('hidden');
      _('.load').classList.toggle('hidden');
      getUser(userInfoEnc, (data) => {
        if(data !== null) {
          setLoginFailed('username or password is already exist');
          _('.submiter').classList.toggle('hidden');
          _('.load').classList.toggle('hidden');
        } else {
          addUser(userInfo.username, userInfo.password, () => {
            setLoginFailed('');
            setSuccess('account successfully created!');
            _('.submiter').classList.toggle('hidden');
            _('.load').classList.toggle('hidden');
            window.location.href = "/login";
          });
        }
      });
    } else {
      window.navigator.vibrate(1000);
    }
  };
  return (
    <form onSubmit={HandleSubmit}>
      {loginFailed && <p className="mt-3 text-red-500 text-sm font-medium">{loginFailed}</p>}
      {success && <p className="mt-3 text-green-500 text-sm font-medium">{success}</p>}
      <Input type="text" globalName="username">insert username here...</Input>
      <Input type="password" globalName="password">insert password here...</Input>
      <Input type="password" globalName="confirm password" change={HandleChange} opsional="cp">confirm your password</Input>
      <Button opsional="submiter">Create account</Button>
      <Button isdisable={true} opsional="load hidden"><Loading/>{" "}Creating your account...</Button>
    </form>
  )
}