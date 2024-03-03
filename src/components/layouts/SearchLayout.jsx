import Input from '.././elements/Input.jsx';

export default ({total, HandleChange}) => {
  return (
    <div className="rounded-full bg-black sticky top-24 w-full pl-5 py-2 pr-2 flex justify-between border border-gray-700">
      <div>
        <h1 className="text-white font-semibold text-xl">Your Notes</h1>
        <p className="text-xs font-normal text-slate-400">total notes : {total}</p>
      </div>
      <div className="flex items-center w-full max-w-48 sm:max-w-xs md:max-w-sm lg:max-w-md">
        <Input change={HandleChange} globalName="search" inputBorder="bg-gray-900 border rounded-full border-gray-700 focus:border-gray-500 active:border-gray-500 w-full relative">Search by title...</Input>
        <i className="text-md text-gray-400 fa-solid fa-magnifying-glass absolute right-5"></i>
      </div>
    </div>
  )
}