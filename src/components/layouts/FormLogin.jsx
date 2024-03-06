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
  const [usernameText, setUsernameText] = useState('username');
  const [passwordText, setPasswordText] = useState('password');
  const [usernameColor, setUsernameColor] = useState('text-slate-400');
  const [passwordColor, setPasswordColor] = useState('text-slate-400');
  const [usernameBorder, setUsernameBorder] = useState('border-gray-500 focus:border-teal-500 active:border-teal-500');
  const [passwordBorder, setPasswordBorder] = useState('border-gray-500 focus:border-teal-500 active:border-teal-500');
  const secret = 'secret';
  useEffect(() => {
    const token = localStorage.getItem('notesqu_token')
    if (token) {
      window.location.href = '/notes';
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
      setUsernameText('username must be minimal ' + e.target.value.length + ' of 4 characters');
      setUsernameColor('text-red-500');
      setUsernameBorder('border-red-500 focus:border-red-500 active:border-red-500');
      setLoginFailed('');
    } else {
      setUsernameText('username');
      setUsernameColor('text-slate-400')
      setUsernameBorder('border-gray-500 focus:border-teal-500 active:border-teal-500')
    }
  }
  const PasswordChange = (e) => {
    if(e.target.value.length < 8) {
      setPasswordText('password must be minimal ' + e.target.value.length + ' of 8 characters');
      setPasswordColor('text-red-500');
      setPasswordBorder('border-red-500 focus:border-red-500 active:border-red-500');
      setLoginFailed('');
    } else {
      setPasswordText('password');
      setPasswordColor('text-slate-400');
      setPasswordBorder('border-gray-500 focus:border-teal-500 active:border-teal-500')
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
        window.location.href = '/notes';
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
      <Input change={UserChange} length="4" type="text" globalName="username" textLabel={usernameText} labelColor={usernameColor} inputBorder={usernameBorder}>insert username here...</Input>
      <Input change={PasswordChange} length="8" type="password" globalName="password" textLabel={passwordText} labelColor={passwordColor} inputBorder={passwordBorder}>insert password here...</Input>
      <Button opsional="submiter">Login</Button>
      <Button isdisable={true} opsional="load hidden"><Loading/>Loging in...</Button>
    </form>
  )
}