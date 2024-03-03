import { Link } from 'react-router-dom';
export default ({username, ids}) => {
  return (
    <nav className="w-full fixed top-0">
      <div className="pl-4 py-3 pr-4 bg-black border-b border-gray-700 flex justify-between items-center">
        <Link className="shadow text-blue-500 text-2xl font-bold" to="/">NotesQu</Link>
        <Link to="/setting" className="flex pl-2 pr-4 py-1 gap-3 items-center rounded-full bg-gray-900 border border-gray-700">
          <i className="fa-solid fa-user bg-gray-700 text-xl text-blue-500 py-2 px-3 rounded-full"></i>
          <div>
            <p className="text-sm font-medium text-white">{username}</p>
            <p className="text-xs text-slate-400 font-normal">{ids}</p>
          </div>
        </Link>
      </div>
    </nav>
  )
}