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
    </div>
   </>
  )
}