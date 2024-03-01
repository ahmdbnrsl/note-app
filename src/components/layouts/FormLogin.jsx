import { useState, useEffect } from 'react';
import sign from 'jwt-encode';
import { jwtDecode } from 'jwt-decode';
import Input from '.././fragments/Inputs.jsx';
import Button from '.././elements/Button.jsx';
import Loading from '.././elements/Loading.jsx';
import { getUser } from '../.././service/db.service.js';

export default () => {
  const _ = (e) => document.querySelector(e);
  const [loginFailed, setLoginFailed] = useState('');
  const [success, setSuccess] = useState('');
  const secret = 'secret';
  useEffect(() => {
    const token = localStorage.getItem('notesqu_token')
    if (token) {
      window.location.href = '/';
    }
  }, []);
  useEffect(() => {
    document.addEventListener('invalid', (() => { return (e) => {
        e.preventDefault();
        if(_('.username').value.length < 4) {
        _('.username').focus();
        } else if (_('.password').value.length < 8) {
          _('.password').focus();
        }
      };
    })(), true);
  }, []);
  const UserChange = (e) => {
    if(e.target.value.length < 4) {
      setLoginFailed('username must be ' + e.target.value.length + ' of 4 characters');
    } else {
      setLoginFailed('');
    }
  }
  const PasswordChange = (e) => {
    if(e.target.value.length < 8) {
      setLoginFailed('password must be ' + e.target.value.length + ' of 8 characters');
    } else {
      setLoginFailed('');
    }
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    _('.submiter').classList.toggle('hidden');
    _('.load').classList.toggle('hidden');
    const userInfo = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    const userInfoEnc = sign(userInfo, secret);
    getUser(userInfoEnc, (data) => {
      if(data !== null) {
        setLoginFailed('')
        setSuccess('login successfully')
        _('.submiter').classList.toggle('hidden');
        _('.load').classList.toggle('hidden');
        localStorage.setItem('notesqu_token', data.token);
        window.location.href = '/';
      } else {
        setLoginFailed('username or password is incorrect');
        _('.submiter').classList.toggle('hidden');
        _('.load').classList.toggle('hidden');
      }
    })
  };
  return (
    <form onSubmit={HandleSubmit}>
      {loginFailed && <p className="mt-3 text-red-500 text-sm font-medium"><i className="fa-solid fa-triangle-exclamation"></i>{" "}{loginFailed}</p>}
      {success && <p className="mt-3 text-green-500 text-sm font-medium"><i className="fa-solid fa-circle-check"></i>{" "}{success}</p>}
      <Input change={UserChange} length="4" type="text" globalName="username">insert username here...</Input>
      <Input change={PasswordChange} length="8" type="password" globalName="password">insert password here...</Input>
      <Button opsional="submiter">Login</Button>
      <Button isdisable={true} opsional="load hidden"><Loading/>Loging in...</Button>
    </form>
  )
}