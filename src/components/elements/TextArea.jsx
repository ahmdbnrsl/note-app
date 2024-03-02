export default ({type, globalName, children, change, length, inputBorder}) => {
  return (
    <textarea
      type={type}
      id={globalName}
      name={globalName}
      placeholder={children} 
      className={`w-full px-3 py-2 border-2 rounded bg-black font-normal h-40 max-h-40 min-h-40 text-sm text-white focus:text-white active:text-white outline-0 ${globalName} ${inputBorder}`}
      required
      minlength={length}
      maxlength="25000"
      onChange={change}></textarea>
  )
}