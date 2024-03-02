import Input from '.././fragments/Inputs.jsx';
import TextArea from '.././fragments/TextArea.jsx';
import Loading from '.././elements/Loading.jsx';
import Button from '.././elements/Button.jsx';

export default ({HandleSubmit, load, btn}) => {
  return (
    <form onSubmit={HandleSubmit} className="form">
      <Input length="4" type="text" globalName="title" textLabel="title" labelColor="text-slate-400" inputBorder="border-gray-500 focus:border-blue-500 active:border-blue-500">insert your notes title here...</Input>
      <TextArea length="30" type="text" globalName="notes" textLabel="notes" labelColor="text-slate-400" inputBorder="border-gray-500 focus:border-blue-500 active:border-blue-500">your notes goes here...</TextArea>
      <Button opsional={btn}>Add</Button>
      <Button isdisable={true} opsional={`${load} hidden`}><Loading/>Adding your notes...</Button>
    </form>
  )
}