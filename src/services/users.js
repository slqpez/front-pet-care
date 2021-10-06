// https://petcareiw.herokuapp.com/api/users/getUser

const BASE_URL = "http://localhost:4000/api/users";

export function getUser(token) {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.user)
    .catch((err) => console.log(err));
}

export function getUserByID(token, userId) {
  return fetch(`${BASE_URL}/user/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.user)
    .catch((err) => console.log(err));
}

export function getUsers(token) {
  return fetch(`${BASE_URL}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

export function registerUser(user, token) {
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export async function deleteUser(id, token) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}



export function editUser(id, token, user) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => data);
}