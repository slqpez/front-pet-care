import React from 'react'
import "./petCard.css"
import {Link} from "react-router-dom"

function PetCard({name, breed, size,id, handleDelete, handleEdit}) {


  return (
    <div className="petCardContainer">
      <Link to={`/pet/${id}`} className="petCard" >
      <h4>{name}</h4>
      <p>{breed}</p>
      <p>{size}</p>
    </Link>

    <button onClick={handleDelete} data-id={id}>Eliminar</button>
    <button data-id={id} onClick={handleEdit}>Editar</button>
    </div>
    
  )
}

export default PetCard
