//https://petcareiw.herokuapp.com/api/auth/login

const BASE_URL = 'http://localhost:4000/api/auth'


export function login(user){
 return fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data=>data)
}