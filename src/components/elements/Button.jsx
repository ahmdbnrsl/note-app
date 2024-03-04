export default ({children, isdisable, opsional}) => {
  return (
    <button
      type="submit"
      className={`flex justify-center items-center rounded bg-gradient-to-r from-teal-500 to-blue-400 text-white w-full px-3 py-2 font-medium text-sm mt-5 cursor-pointer text-center ${opsional}`}
      disabled={isdisable}>{children}</button>
  )
}