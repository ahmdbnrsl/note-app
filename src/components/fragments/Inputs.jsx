import Label from '.././elements/Label.jsx'
import Input from '.././elements/Input.jsx';

export default ({type, globalName, children, opsional, change, length, textLabel, labelColor, inputBorder}) => {
  return (
    <div className={`w-full my-3 flex flex-col ${opsional}`}>
      <Label globalFor={globalName} textLabel={textLabel} labelColor={labelColor}/>
      <Input type={type} change={change} globalName={globalName} length={length} inputBorder={inputBorder}>{children}</Input>
    </div>
  )
}