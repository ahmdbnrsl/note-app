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
  const [usernameText, setUsernameText] = useState('username');
  const [passwordText, setPasswordText] = useState('password');
  const [confirmText, setConfirmText] = useState('confirm password');
  const [usernameColor, setUsernameColor] = useState('text-slate-400');
  const [passwordColor, setPasswordColor] = useState('text-slate-400');
  const [confirmColor, setConfirmColor] = useState('text-slate-400');
  const [usernameBorder, setUsernameBorder] = useState('border-gray-500 focus:border-blue-500 active:border-blue-500');
  const [passwordBorder, setPasswordBorder] = useState('border-gray-500 focus:border-blue-500 active:border-blue-500');
  const [confirmBorder, setConfirmBorder] = useState('border-gray-500 focus:border-blue-500 active:border-blue-500');
  const HandleChange = (e) => {
    if(e.target.value !== _('.password').value) {
      setConfirmText('confirm password is not suitable');
      setConfirmColor('text-red-500');
      setConfirmBorder('border-red-500 focus:border-red-500 active:border-red-500');
      setLoginFailed('');
    } else {
      setConfirmText('confirm password');
      setConfirmColor('text-slate-400')
      setConfirmBorder('border-gray-500 focus:border-blue-500 active:border-blue-500')
    }
  }
  const UserChange = (e) => {
    if(e.target.value.length < 4) {
      setUsernameText('username must be ' + e.target.value.length + ' of 4 characters');
      setUsernameColor('text-red-500');
      setUsernameBorder('border-red-500 focus:border-red-500 active:border-red-500');
      setLoginFailed('');
    } else {
      setUsernameText('username');
      setUsernameColor('text-slate-400')
      setUsernameBorder('border-gray-500 focus:border-blue-500 active:border-blue-500')
    }
  }
  const PasswordChange = (e) => {
    if(e.target.value.length < 8) {
      setPasswordText('password must be ' + e.target.value.length + ' of 8 characters');
      setPasswordColor('text-red-500');
      setPasswordBorder('border-red-500 focus:border-red-500 active:border-red-500');
      setLoginFailed('');
    } else {
      setPasswordText('password');
      setPasswordColor('text-slate-400');
      setPasswordBorder('border-gray-500 focus:border-blue-500 active:border-blue-500')
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('notesqu_token')
    if (token) {
      window.location.href = '/';
    }
  }, []);
  useEffect(() => {
    document.addEventListener('invalid', (() => {
      return (e) => {
        e.preventDefault();
        if (_(".username").value === '' || _('.username').value.length < 4) {
          _(".username").focus();
        } else if (_(".password").value === '' || _('.password').value.length < 8) {
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
          setLoginFailed('username is already exist');
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
      {loginFailed && <p className="mt-3 text-red-500 text-sm font-medium"><i className="fa-solid fa-triangle-exclamation"></i>{" "}{loginFailed}</p>}
      {success && <p className="mt-3 text-green-500 text-sm font-medium"><i className="fa-solid fa-circle-check"></i>{" "}{success}</p>}
      <Input textLabel={usernameText} type="text" globalName="username" length="4" change={UserChange} labelColor={usernameColor} inputBorder={usernameBorder}>insert username here...</Input>
      <Input textLabel={passwordText} type="password" globalName="password" change={PasswordChange} length="8" labelColor={passwordColor} inputBorder={passwordBorder}>insert password here...</Input>
      <Input type="password" globalName="confirm" change={HandleChange} opsional="cp" length="8" textLabel={confirmText} labelColor={confirmColor} inputBorder={confirmBorder}>confirm your password</Input>
      <Button opsional="submiter">Create account</Button>
      <Button isdisable={true} opsional="load hidden"><Loading/>{" "}Creating your account...</Button>
    </form>
  )
}