// https://petcareiw.herokuapp.com/api/users/getUser

const BASE_URL = 'http://localhost:4000/api/owners'


export function createOwner(owner){
  return fetch(`${BASE_URL}`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(owner),
     })
     .then(response => response.json())
     .then(data=>data)
     .catch(err=> console.log(err))
 }

export function getOwner(id,token){
  return fetch(`${BASE_URL}/owner/${id}`,{
    headers:{
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res=>res.json())
    .then(data=>data)
    .catch(err=>console.log(err))
}
