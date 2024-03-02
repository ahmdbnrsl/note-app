import Input from '.././fragments/Inputs.jsx';
import TextArea from '.././fragments/TextArea.jsx';
import Loading from '.././elements/Loading.jsx';
import Button from '.././elements/Button.jsx';
import { useState } from 'react';

export default ({HandleSubmit, load, btn}) => {
  const [titleText, setTitleText] = useState('title');
  const [notesText, setNotesText] = useState('notes');
  const [titleColor, setTitleColor] = useState('text-slate-400');
  const [notesColor, setNotesColor] = useState('text-slate-400');
  const [titleBorder, setTitleBorder] = useState('border-gray-500 focus:border-blue-500 active:border-blue-500');
  const [notesBorder, setNotesBorder] = useState('border-gray-500 focus:border-blue-500 active:border-blue-500');
  
  const TitleChange = (e) => {
    if(e.target.value.length < 4) {
      setTitleText('title must be minimal ' + e.target.value.length + ' of 4 characters');
      setTitleColor('text-red-500');
      setTitleBorder('border-red-500 focus:border-red-500 active:border-red-500');
    } else {
      setTitleText('title');
      setTitleColor('text-slate-400')
      setTitleBorder('border-gray-500 focus:border-blue-500 active:border-blue-500')
    }
  }
  const NotesChange = (e) => {
    if(e.target.value.length < 30) {
      setNotesText('notes must be minimal ' + e.target.value.length + ' of 30 characters');
      setNotesColor('text-red-500');
      setNotesBorder('border-red-500 focus:border-red-500 active:border-red-500');
    } else {
      setNotesText('notes');
      setNotesColor('text-slate-400');
      setNotesBorder('border-gray-500 focus:border-blue-500 active:border-blue-500')
    }
  }
  
  return (
    <form onSubmit={HandleSubmit} className="form">
      <Input change={TitleChange} length="4" type="text" globalName="title" textLabel={titleText} labelColor={titleColor} inputBorder={titleBorder}>insert your notes title here...</Input>
      <TextArea change={NotesChange} length="30" type="text" globalName="notes" textLabel={notesText} labelColor={notesColor} inputBorder={notesBorder}>your notes goes here...</TextArea>
      <Button opsional={btn}>Add</Button>
      <Button isdisable={true} opsional={`${load}`}><Loading/>Adding your notes...</Button>
    </form>
  )
}