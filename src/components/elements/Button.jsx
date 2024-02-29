export default ({children, isdisable, opsional}) => {
  return (
    <button
      type="submit"
      className={`flex justify-center items-center rounded bg-blue-500 text-white w-full px-3 py-2 font-medium text-sm mt-3 cursor-pointer text-center ${opsional}`}
      disabled={isdisable}>{children}</button>
  )
}