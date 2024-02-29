import Input from '.././fragments/Inputs.jsx';
import Button from '.././elements/Button.jsx';

export default () => {
  return (
    <form>
      <Input type="text" globalName="username">insert username here...</Input>
      <Input type="password" globalName="password">insert password here...</Input>
      <Button>Login</Button>
    </form>
  )
}