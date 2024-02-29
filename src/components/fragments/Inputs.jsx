import Label from '.././elements/Label.jsx'
import Input from '.././elements/Input.jsx';

export default ({type, globalName, children}) => {
  return (
    <div className="w-full my-3 flex flex-col">
      <Label globalFor={globalName}/>
      <Input type={type} globalName={globalName}>{children}</Input>
    </div>
  )
}