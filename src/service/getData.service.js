import axios from "axios";

export const getData = (callback) => {
  axios.get('https://serverless-bun.vercel.app/data')
  .then(result => {
    callback(result.data);
  })
  .catch(err => {
    alert(err);
  })
}

export const postData = (title, description, code) => {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  axios.post('https://serverless-bun.vercel.app/data', {
    title,
    description,
    code,
    time: new Date().toDateString() + ' at ' + hour + ':' + minute,
    edited: false
  }).then(res => {
    console.log(res)
  })
  .catch(err => alert(err));
}

export const updateData = (id, title, description, code) => {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  axios.put('https://serverless-bun.vercel.app/data', {
    id,
    title,
    description,
    code,
    time: new Date().toDateString() + ' at ' + hour + ':' + minute,
    edited: true
  }).then(res => {
    console.log(res)
  })
  .catch(err => alert(err));
}

export const deleteData = (id) => {
  axios.delete('https://serverless-bun.vercel.app/data/'+id)
  .then(res => {
    console.log('success');
  })
  .catch(err => {
    alert(err);
  })
}