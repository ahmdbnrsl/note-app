import {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser, addNotes, updateNotes } from '.././service/db.service.js';
import Navbar from '.././components/layouts/Navbar.jsx';
import Form from '.././components/layouts/FormNotes.jsx';
import Result from '.././components/layouts/Result.jsx';
import SearchBar from '.././components/layouts/SearchLayout.jsx';

const HomePage = () => {
  const _ = (e) => document.querySelector(e);
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [notes, setNotes] = useState([]);
  const [load, setLoad] = useState('hidden');
  const [btn, setBtn] = useState('');
  const [found, setFound] = useState('');
  const [visible, setVisible] = useState('utama');
  const [edit, setEdit] = useState('edit hidden');
  const [textLoad, setTextLoad] = useState('');
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('notesqu_token');
  useEffect(() => {
    if (token) {
      const getUsername = jwtDecode(token);
      setUsername(getUsername.username)
    } else {
      window.location.href = '/login';
    }
  }, [username]);
  useEffect(() => {
    getUser(token, (data) => {
      setId(data._id);
      setNotes(data.notes);
      setBtn('');
      setLoad('hidden');
      setTotal(data.notes.length);
      if(data.notes.length === 0) {
        setFound('no notes found.');
      } else {
        setFound('');
      }
    });
  }, [notes, total]);
  useEffect(() => {
    document.addEventListener('invalid', (() => { return (e) => {
        e.preventDefault();
        if(_('.utama .title').value.length < 4) {
        _('.utama .title').focus();
        } else if (_('.utama .notes').value.length < 30) {
          _('.utama .notes').focus();
        }
        if(_('.edit .title').value.length < 4) {
        _('.edit .title').focus();
        } else if (_('.utama .notes').value.length < 30) {
          _('.edit .notes').focus();
        }
      };
    })(), true);
  }, []);
  const HandleSubmit = (e) => {
    e.preventDefault();
    setTextLoad('Adding your notes...');
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
  const HandleEdit = (e) => {
    e.preventDefault();
    setTextLoad('Updating your notes...');
    setBtn('hidden');
    setLoad('');
    updateNotes((time) => {
      const notess = {
        title: e.target.title.value,
        notes: e.target.notes.value,
        edited: true,
        time
      }
      e.target.title.value = '';
      e.target.notes.value = '';
      _('.utama').classList.toggle('hidden');
      _('.edit').classList.toggle('hidden');
      return {
        token,
        notes,
        index: _('.hiddeninput').value,
        edited: notess
      }
    });
  }
  const showForm = (title, notes, index) => {
    _('.utama').classList.toggle('hidden');
    _('.edit').classList.toggle('hidden');
    _('.title').value = title;
    _('.notes').value = notes;
    _('.hiddeninput').value = index;
  }
  return (
  <>
    <Navbar username={username} ids={id}/>
    <div className="w-full min-h-screen bg-black p-5 flex flex-col items-center">
      <div className="w-full max-w-md mt-20">
        <Form HandleSubmit={HandleEdit} load={load} btn={btn} formClass={edit} textBtn="Update" textLoad={textLoad}><input type="hidden" className="hiddeninput"/></Form>
        <Form HandleSubmit={HandleSubmit} load={load} btn={btn} textBtn="Add" textLoad={textLoad} formClass={visible}/>
      </div>
      <div className="w-full max-w-6xl mt-8 flex flex-col items-center">
        <SearchBar total={total}/>
        <div className="w-full flex justify-center flex-wrap mt-8 gap-5">
          {found && <p className="text-slate-400 text-md font-normal">{found}</p>}
          {
            notes.map((data, index) => {
              return (
                <Result notes={notes} token={token} data={data} index={index} showForm={(title, notes, index) => showForm(title, notes, index)}/>
              )
            })
          }
        </div>
      </div>
    </div>
   </>
  )
}

export default HomePage;