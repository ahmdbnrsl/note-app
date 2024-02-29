import { useState } from 'react';
import Input from '.././fragments/Inputs.jsx';
import Button from '.././elements/Button.jsx';
import { data } from '../.././service/db.service.js'

export default () => {
  const _ = (elements) => document.querySelector(elements);
  const secret = 'secret';
  const [loginFailed, setLoginFailed] = useState('');
  const HandleChange = () => {
    if(_('.confirm').value !== _('.password').value) {
      setLoginFailed('confirm password is not suitable');
    } else {
      setLoginFailed('');
    }
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (_('.confirm').value === _('.password').value && e.target.username.value !== '' && e.target.password.value !== '') {
      window.location.href = '/login'
    }
  };
  return (
    <form onSubmit={HandleSubmit}>
      {loginFailed && <p className="mt-3 text-red-500 text-sm font-medium">{loginFailed}</p>}
      <Input type="text" globalName="username">insert username here...</Input>
      <Input type="password" globalName="password">insert password here...</Input>
      <Input type="password" globalName="confirm password" change={HandleChange} opsional="cp">confirm your password</Input>
      <Button>Create account</Button>
    </form>
  )
}