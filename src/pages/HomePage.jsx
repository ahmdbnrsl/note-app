import {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser } from '.././service/db.service.js';
import Navbar from '.././components/layouts/Navbar.jsx';
import Form from '.././components/layouts/FormNotes.jsx'
export default () => {
  const [username, setUsername] = useState('');
  const [totalNotes, setTotalNotes] = useState(0);
  const token = localStorage.getItem('notesqu_token');
  useEffect(() => {
    if (token) {
      const getUsername = jwtDecode(token);
      setUsername(getUsername.username)
    } else {
      window.location.href = '/login';
    }
  }, []);
  useEffect(() => {
    getUser(token, (data) => {
      setTotalNotes(data.notes.length);
    });
  });
  return (
  <>
    <Navbar username={username} totalNotes={totalNotes}/>
    <div className="w-full min-h-screen bg-black p-5 flex flex-col items-center">
      <div className="w-full max-w-md p-3 mt-20">
        <Form/>
      </div>
      <div className="w-full max-w-3xl mt-8 flex flex-col items-center">
        <h1 className="text-white font-semibold text-xl">Your Notes</h1>
        <div className="w-full flex justify-center flex-wrap mt-8 gap-5">
          <div className="h-fit p-4 w-full max-w-lg border border-gray-500 rounded shadow shadow-xl shadow-gray-900">
            <h1 className="text-xl text-white font-semibold">Node Js</h1>
            <p className="text-xs font-normal text-slate-400"><span className="font-medium text-white">Added :</span> 20-02-2024 at 13:25</p>
            <p className="text-xs font-normal text-blue-400"><span className="font-medium text-white">ID :</span> notes-1</p>
            <div className="w-full text-right mt-3">
              <button className="bg-gray-800 rounded pt-2 pl-3 pr-2.5 pb-1 text-white">
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
            <div className="mt-4 w-full p-4 bg-gray-800 max-h-40 rounded overflow-y-auto">
              <pre style={{
                fontFamily: "arial"
              }} className="h-full w-full whitespace-pre-wrap text-slate-200 font-normal text-sm font-arial">hai nama saya ahmad beni rusli, saya berasal dari Jakarta. sekarang saya tinggal di Cilacap, saya adalah seorang Mahasiswa</pre>
            </div>
            <div className="mt-4 w-full flex flex-wrap gap-4">
              <button className="rounded bg-gray-800 text-green-400 font-medium text-md px-4 py-0.5">edit</button>
              <button className="rounded bg-gray-800 text-red-500 font-medium text-md px-4 py-0.5">delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}