export default ({type, globalName, children, change, length, inputBorder}) => {
  return (
    <input
      type={type}
      id={globalName}
      name={globalName}
      placeholder={children} 
      className={`px-3 py-2 border-2 rounded bg-gradient-to-r from-gray-900 to-slate-950 font-normal text-sm text-white focus:text-white active:text-white outline-0 ${globalName} ${inputBorder}`}
      required
      minlength={length}
      maxlength="20"
      onChange={change}/>
  )
}