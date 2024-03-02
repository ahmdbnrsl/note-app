import { Link } from 'react-router-dom';
export default ({username, ids}) => {
  return (
    <nav className="p-5 w-full fixed top-0">
      <div className="pl-4 py-1 pr-1 bg-black border border-gray-700 rounded-3xl flex justify-between items-center">
        <Link className="text-blue-500 text-2xl font-bold" to="/">NotesQu</Link>
        <Link to="/setting" className="flex px-4 py-1 gap-3 items-center rounded-3xl bg-gray-900">
          <i className="fa-solid fa-user text-xl text-blue-500"></i>
          <div>
            <p className="text-sm font-medium text-white">{username}</p>
            <p className="text-xs text-slate-400 font-normal">{ids}</p>
          </div>
        </Link>
      </div>
    </nav>
  )
}