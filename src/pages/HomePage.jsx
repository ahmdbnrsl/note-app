import Nav from '.././components/layouts/Navbar.jsx';
import { Link } from 'react-router-dom';
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
      <div className="w-full min-h-screen bg-black p-5 flex justify-center">
        <div className="w-full max-w-6xl mt-20">
          <h1 className="text-2xl font-semibold text-slate-100">Introduction</h1>
          <div className="mt-3">
            <p className="h-full text-slate-300 text-md font-normal">Notesqu is a web-based note-taking application that helps you keep track of your thoughts, ideas, and to-do lists. With Notesqu, you can easily create, edit, and organize your notes, and access them from anywhere.
            </p>
          </div>
          <div className="flex flex-wrap mt-8 gap-5 justify-center">
            <div className="w-full md:max-w-xs">
              <h1 className="text-lg font-medium text-blue-500">Features</h1>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full"><span className="font-medium text-slate-100">Real-time editing</span> You can always be sure that your work is up-to-date.</p></div>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full"><span className="font-medium text-slate-100">Security</span> Your notes are encrypted and stored securely, so you can be sure that they are safe.</p></div>
            </div>
            <div className="w-full md:max-w-xs">
              <h1 className="text-lg font-medium text-blue-500">Benefits</h1>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full"><span className="font-medium text-slate-100">Improve your productivity</span> Notesqu can help you stay organized and focused, so you can get more done.</p></div>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full"><span className="font-medium text-slate-100">Boost your creativity</span> Notesqu can help you capture your thoughts and ideas, and explore new possibilities.</p></div>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full"><span className="font-medium text-slate-100">Reduce stress</span> Notesqu can help you keep track of your to-do lists and deadlines, so you can feel less stressed.</p></div>
            </div>
            <div className="w-full md:max-w-xs">
              <h1 className="text-lg font-medium text-blue-500">Conclusion</h1>
              <div className="mt-2"><p className="text-sm text-slate-400 font-normal h-full">Notesqu is a powerful and versatile note-taking tool that can help you improve your productivity, boost your creativity, and reduce stress. If you are looking for a way to improve your note-taking, Notesqu is a great option.</p></div>
            </div>
          </div>
          <div className="mt-10 w-full flex flex-col items-center">
            <p className="text-slate-100 font-medium text-md">Get started for a free Notesqu account today and start taking better notes!
            </p>
            <Link to={token ? '/notes' : '/login'} className="mt-5 text-slate-100 text-lg font-medium bg-gray-800 rounded-full px-8 py-2 cursor-pointer hover:bg-gray-900">Get Started</Link>
          </div>
        </div>
      </div>
    </>
  )
}