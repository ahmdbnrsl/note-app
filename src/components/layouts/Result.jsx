export default ({data, index}) => {
  return (
    <div className="h-fit p-4 w-full max-w-lg border border-gray-500 rounded shadow shadow-xl shadow-gray-900">
      <h1 className="text-xl text-white font-semibold">{data.title}</h1>
      <p className="text-xs font-normal text-slate-400"><span className="font-medium text-white">{data.edited ? 'Edited' : 'Added'} :</span> {data.time}</p>
      <p className="text-xs font-normal text-blue-400"><span className="font-medium text-white">ID :</span> notes-{index + 1}</p>
      <div className="w-full text-right mt-3">
        <button className="bg-gray-800 rounded pt-2 pl-3 pr-2.5 pb-1 text-white">
          <i className="fa-regular fa-copy"></i>
        </button>
      </div>
      <div className="mt-4 w-full p-4 bg-gray-800 max-h-40 rounded overflow-y-auto">
        <pre style={{
          fontFamily: "arial"
        }} className="h-full w-full whitespace-pre-wrap text-slate-200 font-normal text-sm font-arial">{data.notes}</pre>
      </div>
      <div className="mt-4 w-full flex flex-wrap gap-4">
        <button className="rounded bg-gray-800 text-green-400 font-medium text-md px-4 py-0.5">edit</button>
        <button className="rounded bg-gray-800 text-red-500 font-medium text-md px-4 py-0.5">delete</button>
      </div>
    </div>
  )
}