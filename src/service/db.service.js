import axios from "axios";

const key = import.meta.env.VITE_ACCESS_KEY;

const getTime = () => {
  let date = new Date().toDateString();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();   
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  return date + ' at ' + hour + ':' + minute;
}

export const getUser = (token, callback) => {
  axios.get('https://database-notes-apo-benirusli.vercel.app/user/' + token + '?key=' + key)
  .then(res => callback(res.data))
  .then(err => console.log(err));
};

export const addUser = (username, password, callback) => {
  axios.post('https://database-notes-apo-benirusli.vercel.app/users', {
    username,
    password,
    date: getTime(),
    key
  })
  .then(res => callback())
  .catch(err => console.error(err));
};

export const deleteUser = (callback) => {
  const token = callback();
  axios.delete('https://database-notes-apo-benirusli.vercel.app/users/' + token + '?key=' + key)
  .then(res => console.log(res.data))
  .then(err => console.error(err));
}

export const addNotes = (callback) => {
  const time = getTime();
  const data = callback(time);
  const {token, notes, latestNotes} = data;
  axios.put('https://database-notes-apo-benirusli.vercel.app/users/addnotes', {
    token,
    notes,
    latestNotes,
    key
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
    notes,
    key
  })
  .then(res => console.log('success'))
  .catch(err => console.error(err));
}

export const updateNotes = (callback) => {
  const time = getTime();
  const data = callback(time);
  const {token, notes, index, edited} = data;
  notes.splice(index, 1, edited);
  axios.put('https://database-notes-apo-benirusli.vercel.app/users/editnotes', {
    token,
    notes,
    key
  })
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
}