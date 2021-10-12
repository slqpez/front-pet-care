import React, {useEffect, useState} from 'react'
import jwt from 'jwt-decode'
import {useParams} from "react-router-dom"
import {getOwner} from "../../services/owners"
import {getPet} from "../../services/pets"

function ClientPage() {


  const [owner,setOwner]= useState({})
  const [pet,setPet]= useState({})
  const {token} = useParams()
  
  const {id} = jwt(token)
  console.log(id)

  useEffect(() => {

    getOwner(id, token)
    .then(data=> {
      setOwner(data)
      getPet(data.pets[0], token)
      .then(petData=> setPet(petData))
      .catch(error=>console.log("sa"))
    })
    .catch(error=> console.log("algo malió sal"))

  },[])

  if(!owner) return <p>No tienes mascotas registradas.</p>

  console.log("fcs")
  return (
    <div>
      <h3>La información de tu mascota es la siguiente</h3>
      <p>{pet?.name}</p>
      <p>{pet?.size}</p>
      <p>{pet?.age}</p>
      <p>{pet?.breed}</p>

      <p>{pet?.bathed?"Ya está bañado":"Aún no está bañado"}</p>
      <p>{pet?.allergies}</p>
      <p>{pet?.findings}</p>
      <p>{pet?.date}</p>
    </div>
  )
}

export default ClientPage
