import Input from '.././fragments/Inputs.jsx';
import Button from '.././elements/Button.jsx';

export default () => {
  return (
    <form>
      <Input type="text" globalName="username">insert username here...</Input>
      <Input type="password" globalName="password">insert password here...</Input>
      <Input type="password" globalName="confirm password">confirm your password</Input>
      <Button>Create account</Button>
    </form>
  )
}