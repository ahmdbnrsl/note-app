export default ({globalFor, textLabel, labelColor}) => {
  return (
    <label
      htmlFor={globalFor}
      className={`pl-1.5 text-xs font-normal ${labelColor}`}>{textLabel}</label>
  )
}