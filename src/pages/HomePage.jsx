import {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser, addNotes } from '.././service/db.service.js';
import Navbar from '.././components/layouts/Navbar.jsx';
import Form from '.././components/layouts/FormNotes.jsx';
import Result from '.././components/layouts/Result.jsx';
export default () => {
  const _ = (e) => document.querySelector(e);
  const [username, setUsername] = useState('');
  const [totalNotes, setTotalNotes] = useState(0);
  const [notes, setNotes] = useState([]);
  const [load, setLoad] = useState('hidden');
  const [btn, setBtn] = useState('');
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
      setNotes(data.notes);
      setBtn('');
      setLoad('hidden');
    });
  });
  useEffect(() => {
    document.addEventListener('invalid', (() => { return (e) => {
        e.preventDefault();
        if(_('.title').value.length < 4) {
        _('.title').focus();
        } else if (_('.notes').value.length < 30) {
          _('.notes').focus();
        }
      };
    })(), true);
  }, []);
  const HandleSubmit = (e) => {
    e.preventDefault();
    setBtn('hidden');
    setLoad('');
    addNotes((time) => {
      const notess = {
        title: e.target.title.value,
        notes: e.target.notes.value,
        edited: false,
        time
      }
      e.target.title.value = '';
      e.target.notes.value = '';
      return {
        token,
        notes: notess,
        latestNotes: notes
      }
    });
  }
  return (
  <>
    <Navbar username={username} totalNotes={totalNotes}/>
    <div className="w-full min-h-screen bg-black p-5 flex flex-col items-center">
      <div className="w-full max-w-md p-3 mt-20">
        <Form HandleSubmit={HandleSubmit} load={load} btn={btn}/>
      </div>
      <div className="w-full max-w-8xl mt-8 flex flex-col items-center">
        <h1 className="text-white font-semibold text-xl">Your Notes</h1>
        <div className="w-full flex justify-center flex-wrap mt-8 gap-5">
          {<p className="text-xl font-semibold text-slate-400">no notes found.</p> &&
            notes.map((data, index) => {
              return (
                <Result notes={notes} token={token} data={data} index={index}/>
              )
            })
          }
        </div>
      </div>
    </div>
   </>
  )
}