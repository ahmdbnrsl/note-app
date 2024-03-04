import { deleteNotes } from '../.././service/db.service.js';
import {useState} from 'react';

export default ({data, index, token, notes, showForm}) => {
  const _ = (e) => document.querySelector(e);
  const [cek, setCek] = useState('fa-regular fa-copy');
  const HandleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCek('fa-solid fa-check text-green-400');
    setTimeout(() => {
      setCek('fa-regular fa-copy text-white');
    }, 500)
  }
  const HandleDelete = (indexs) => {
    deleteNotes(() => {
      return {
        token,
        notes,
        index: indexs
      }
    })
  }
  return (
    <div className="h-fit p-4 w-full xl:max-w-lg border border-gray-500 rounded shadow shadow-xl shadow-gray-900">
      <div><h1 className="h-full text-xl text-white font-semibold">{data.title}</h1></div>
      <div><p className="h-full text-xs font-normal text-slate-400"><span className="font-medium text-white">{data.edited ? 'Edited' : 'Added'} :</span> {data.time}</p></div>
      <div><p className="h-full text-xs font-normal text-blue-400"><span className="font-medium text-white">ID :</span> notes-{index + 1 * 425 * 15 / 14}</p></div>
      <div className="w-full text-right mt-3">
        <button onClick={() => HandleCopy(data.notes)} className="cursor-pointer bg-gray-800 rounded pt-2 pl-3 pr-2.5 pb-1 text-white hover:bg-gray-900">
          <i className={cek}></i>
        </button>
      </div>
      <div className="mt-4 w-full p-4 bg-gray-800 max-h-40 rounded overflow-y-auto">
        <pre style={{
          fontFamily: '"Inter", system-ui, sans-serif'
        }} className="h-full w-full whitespace-pre-wrap text-slate-200 font-normal text-sm font-arial">{data.notes}</pre>
      </div>
      <div className="mt-4 w-full flex flex-wrap gap-4">
        <button className="cursor-pointer rounded bg-gray-800 text-green-400 font-medium text-md px-4 py-0.5 hover:bg-gray-900" onClick={() => showForm(data.title, data.notes, index)}>edit</button>
        <button className="cursor-pointer rounded bg-gray-800 text-red-500 font-medium text-md px-4 py-0.5 hover:bg-gray-900" onClick={() => HandleDelete(index)}>delete</button>
      </div>
    </div>
  )
}