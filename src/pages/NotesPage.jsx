import {useState, useEffect} from 'react';
import { jwtDecode } from 'jwt-decode';
import { getUser, addNotes, updateNotes } from '.././service/db.service.js';
import { useSearchParams } from "react-router-dom";
import Navbar from '.././components/layouts/Navbar.jsx';
import Form from '.././components/layouts/FormNotes.jsx';
import Result from '.././components/layouts/Result.jsx';
import SearchBar from '.././components/layouts/SearchLayout.jsx';
import List from '.././components/layouts/ListNotesLayout.jsx';

const HomePage = () => {
  const _ = (e) => document.querySelector(e);
  const [searchParams, setSearchParams] = useSearchParams();
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
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    });
    _('.utama').classList.toggle('hidden');
    _('.edit').classList.toggle('hidden');
    _('.title').value = title;
    _('.notes').value = notes;
    _('.hiddeninput').value = index;
  }
  const SearchChange = (e) => {
    if (e.target.value !== "") {
      searchParams.set("title", e.target.value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("title");
      setSearchParams(searchParams);
    }
  }
  const query = searchParams.get("title");
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query?.toLowerCase() || "")
  );
  return (
  <>
    <Navbar username={username} ids={id}/>
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 to-cyan-950 px-5 pt-5 pb-12 flex flex-col items-center">
      <div className="w-full max-w-md mt-20">
        <Form HandleSubmit={HandleEdit} load={load} btn={btn} formClass={edit} textBtn="Update" textLoad={textLoad}><input type="hidden" className="hiddeninput"/></Form>
        <Form HandleSubmit={HandleSubmit} load={load} btn={btn} textBtn="Add" textLoad={textLoad} formClass={visible}/>
      </div>
      <div className="w-full max-w-6xl mt-8 flex flex-col items-center">
        <SearchBar total={total} HandleChange={SearchChange}/>
        <div className="w-full flex justify-center flex-wrap mt-8 gap-5">
          <List notesData={filteredNotes} notes={notes} showForm={(title, notes, index) => showForm(title, notes, index)} token={token}/>
        </div>
      </div>
    </div>
   </>
  )
}

export default HomePage;