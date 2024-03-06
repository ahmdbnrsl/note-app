import { getUser, deleteUser } from '.././service/db.service.js';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default () => {
  const token = localStorage.getItem('notesqu_token');
  const [user, setUser] = useState({});
  const [created, setCreated] = useState('');
  const [length, setLength] = useState(0);
  const [id, setId] = useState('');
  const [cek, setCek] = useState('fa-regular fa-copy');
  const HandleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCek('fa-solid fa-check text-teal-400');
    setTimeout(() => {
      setCek('fa-regular fa-copy');
    }, 500)
  }
  const HandleDelete = () => {
    localStorage.removeItem('notesqu_token');
    deleteUser(() => {
      window.location.href = '/register'
      return token;
    })
  }
  useEffect(() => {
    if (token) {
      const getUsername = jwtDecode(token);
      setUser(getUsername);
      getUser(token, (data) => {
        setCreated(data.createdAt);
        setLength(data.notes.length);
        setId(data._id)
      })
    } else {
      window.location.href = '/login';
    }
  }, [user]);
  const HandleLogout = (e) => {
    e.preventDefault();
    window.location.href = '/login';
    localStorage.removeItem('notesqu_token');
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 to-cyan-950 flex justify-center items-center p-5">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-teal-500">Account Info</h1>
        <p className="mt-3 text-slate-300 font-medium text-md pl-5">Username</p>
        <div className="mt-1 w-full bg-gray-700 rounded border border-gray-700 flex justify-between overflow-hidden">
          <p className="text-white text-lg font-medium px-5 py-2">{user.username}</p>
          <button className="text-teal-400 text-lg py-2 bg-gray-800 px-5" onClick={() => HandleCopy(user.username)}><i className={cek}></i></button>
        </div>
        <p className="mt-3 text-slate-300 font-medium text-md pl-5">Password</p>
        <div className="mt-1 w-full bg-gray-700 rounded border border-gray-700 flex justify-between overflow-hidden">
          <p className="text-white text-lg font-medium px-5 py-2">{user.password}</p>
          <button className="text-teal-400 text-lg py-2 bg-gray-800 px-5" onClick={() => HandleCopy(user.password)}><i className={cek}></i></button>
        </div>
        <p className="mt-3 text-slate-300 font-medium text-md pl-5">ID</p>
        <div className="mt-1 w-full bg-gray-700 rounded border border-gray-700 flex justify-between overflow-hidden">
          <p className="text-white text-lg font-medium px-5 py-2">{id}</p>
          <button className="text-teal-400 text-lg py-2 bg-gray-800 px-5" onClick={() => HandleCopy(id)}><i className={cek}></i></button>
        </div>
        <div className="mt-5 w-full flex justify-between gap-3">
          <div className="w-1/2 p-3 bg-gray-800 rounded flex flex-col justify-center items-center border border-gray-700">
            <p className="text-lg text-teal-400 font-semibold">Created At</p>
            <p className="text-md font-medium text-slate-300">{created}</p>
          </div>
          <div className="w-1/2 p-3 bg-gray-800 rounded flex flex-col justify-center items-center border border-gray-700">
            <p className="text-lg text-teal-400 font-semibold">Total Notes</p>
            <p className="text-md font-medium text-slate-300">{length}</p>
          </div>
        </div>
        <div className="mt-3 w-full flex justify-between gap-3">
          <button className="w-1/2 p-3 bg-gray-800 rounded border border-gray-700 text-lg font-medium text-yellow-400 hover:bg-gray-900" onClick={HandleLogout}><i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>Log Out</button>
          <button className="w-1/2 p-3 bg-gray-800 rounded border border-gray-700 text-lg font-medium text-red-500 hover:bg-gray-900" onClick={HandleDelete}><i className="fa-solid fa-trash mr-2"></i>Delete Account</button>
        </div>
      </div>
    </div>
  )
}