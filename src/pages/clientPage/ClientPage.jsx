import React, {useEffect, useState} from 'react'
import jwt from 'jwt-decode'
import {useParams} from "react-router-dom"
import {getOwner} from "../../services/owners"
import {getPet} from "../../services/pets"
import "./clientepage.css";

function ClientPage() {


  const [owner,setOwner]= useState({})
  const [pet,setPet]= useState({})
  const {token} = useParams()
  
  const {id} = jwt(token)

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

  return (
    <div className="infoContainer">
      <h2>La información de tu mascota es la siguiente</h2>
      <p>Nombre: {pet?.name}</p>
      <p>Tamaño: {pet?.size}</p>
      <p>Edad: {pet?.age}</p>
      <p>Raza: {pet?.breed}</p>

      <p>Estado del baño: {pet?.bathed?"Bañado":"Sin bañar"}</p>
      <p>Alergias: {pet?.allergies}</p>
      <p>Hallazgos: {pet?.findings}</p>
      {pet?.bathed ? null: <p>Fecha de cita: {pet?.date}</p>  }
    </div>
  )
}

export default ClientPage
