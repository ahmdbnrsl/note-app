export default ({type, globalName, children}) => {
  return (
    <input
      type={type}
      id={globalName}
      name={globalName}
      placeholder={children} 
      className="px-3 py-2 border-2 border-gray-500 rounded bg-black font-normal text-sm text-white focus:text-white focus:border-blue-500 active:text-white active:border-blue-500 outline-0"
      required
      minlength="4"
      maxlength="20"/>
  )
}