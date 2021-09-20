// https://petcareiw.herokuapp.com/api/users/getUser

const BASE_URL = 'http://localhost:4000/api/pets'


export function createPet(pet){
  return fetch(`${BASE_URL}`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(pet),
     })
     .then(response => response.json())
     .then(data=>data)
     .catch(err=> console.log(err))
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
