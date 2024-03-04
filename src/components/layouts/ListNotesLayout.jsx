import Result from './Result.jsx';

export default ({notesData, notes, token, showForm}) => {
  return (
    <>
      { notesData.length > 0 ?
         notesData.map((data, index) => {
           return (
             <Result notes={notes} token={token} data={data} index={index} showForm={(title, notes, index) => showForm(title, notes, index)}/>
           )
         }) : <p className="mt-5 text-slate-400 font-normal text-md">no notes found.</p>
       }
    </>
  )
}