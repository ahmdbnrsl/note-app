export default ({children, isdisable}) => {
  return (
    <button
      type="submit"
      className="rounded bg-blue-500 text-white w-full px-3 py-2 font-medium text-sm mt-3 cursor-pointer"
      disabled={isdisable}>{children}</button>
  )
}