import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import Notes from './pages/NotesPage.jsx';
import Register from './pages/SignupPage.jsx';
import Login from './pages/LoginPage.jsx';
import './index.css';
import './fa.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <p>404</p>
  },
  {
    path: "/notes",
    element: <Notes/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)