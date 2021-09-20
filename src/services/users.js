// https://petcareiw.herokuapp.com/api/users/getUser

const BASE_URL = 'http://localhost:4000/api/users'


export function getUser(token){
  return fetch(`${BASE_URL}/user`,{
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res=>res.json())
    .then(data=>data.user)
    .catch(err=>console.log(err))
}

export function getUsers(token){
  return fetch(`${BASE_URL}`,{
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}


export function registerUser(user, token){
  return fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`

      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(data=> data)
}
