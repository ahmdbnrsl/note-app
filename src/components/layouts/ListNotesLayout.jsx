import Result from './Result.jsx';

export default ({notesData, notes, token, showForm}) => {
  return (
    <>
      {
         notesData().map((data, index) => {
           return (
             <Result notes={notes} token={token} data={data} index={index} showForm={(title, notes, index) => showForm(title, notes, index)}/>
           )
         })
       }
    </>
  )
}