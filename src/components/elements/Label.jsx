export default ({globalFor}) => {
  return (
    <label
      htmlFor={globalFor}
      className="pl-1.5 text-xs font-normal text-slate-400">{globalFor}</label>
  )
}