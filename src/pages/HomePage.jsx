import Nav from '.././components/layouts/Navbar.jsx';
import {getUser} from '.././service/db.service.js';
import {useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('notesqu_token');

export default () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    getUser(token, (data) => {
      setId(data._id);
      setUsername(jwtDecode(data.token).username);
    })
  }, [])
  return (
    <>
      <Nav ids={id ? id : ''} username={username ? username : ''}/>
      <div className="w-full min-h-screen bg-black p-5">
    
      </div>
    </>
  )
}