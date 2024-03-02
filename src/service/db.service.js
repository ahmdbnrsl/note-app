import axios from "axios";

export const getUser = (token, callback) => {
  axios.get('https://database-notes-apo-benirusli.vercel.app/user/' + token)
  .then(res => callback(res.data))
  .then(err => console.log(err));
};

let date = new Date().toDateString();
let hour = new Date().getHours();
let minute = new Date().getMinutes();   
if (hour < 10) hour = "0" + hour;
if (minute < 10) minute = "0" + minute;

export const addUser = (username, password, callback) => {
  axios.post('https://database-notes-apo-benirusli.vercel.app/users', {
    username,
    password,
    date: date + ' at ' + hour + ':' + minute
  })
  .then(res => callback())
  .catch(err => console.error(err));
};

export const addNotes = (callback) => {
  const time = date + ' at ' + hour + ':' + minute;
  const data = callback(time);
  const {token, notes, latestNotes} = data;
  axios.put('https://database-notes-apo-benirusli.vercel.app/users/addnotes', {
    token,
    notes,
    latestNotes
  })
  .then(res => console.log('success'))
  .catch(err => console.error(err));
};

export const deleteNotes = (callback) => {
  const data = callback();
  const {token, notes, index} = data;
  notes.splice(index, 1);
  axios.put('https://database-notes-apo-benirusli.vercel.app/users/editnotes', {
    token,
    notes
  })
  .then(res => console.log('success'))
  .catch(err => console.error(err));
}