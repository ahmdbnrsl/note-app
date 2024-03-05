import { Link } from 'react-router-dom';
export default ({username, ids}) => {
  return (
    <nav className="w-full fixed top-0">
      <div className="pl-4 py-3 pr-4 bg-gradient-to-r from-gray-900 to-slate-950 border-b border-gray-700 flex justify-between items-center">
        <Link className="shadow text-teal-500 text-2xl font-bold cursor-pointer" to="/">NotesQu</Link>
        {username && ids ? <Link to="/account" className="cursor-pointer flex pl-2 pr-4 py-1 gap-3 items-center rounded-full bg-gray-900 border border-gray-700">
          <i className="fa-solid fa-user bg-gray-700 text-xl text-slate-100 py-2 px-3 rounded-full"></i>
          <div>
            <p className="text-sm font-medium text-white">{username}</p>
            <p className="text-xs text-teal-400 font-normal">{ids}</p>
          </div>
        </Link> : <Link className="cursor-pointer rounded-full bg-gray-800 text-teal-400 text-lg font-medium px-8 pb-1 border border-gray-700" to="/login">login</Link>}
      </div>
    </nav>
  )
}