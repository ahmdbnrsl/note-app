import axios from "axios";

export const getUser = (token, callback) => {
  axios.get('https://database-notes-apo-benirusli.vercel.app/user/' + token)
  .then(res => callback(res.data))
  .then(err => console.log(err));
};

export const addUser = (username, password, callback) => {
  let date = new Date().toDateString();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();   
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  axios.post('https://database-notes-apo-benirusli.vercel.app/users', {
    username,
    password,
    date: date + ' at ' + hour + ':' + minute
  })
  .then(res => callback())
  .catch(err => console.error(err));
};