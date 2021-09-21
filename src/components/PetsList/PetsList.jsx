import React from 'react'
import Pet from "../PetCard/PetCard"
import "./petsList.css"

function PetsList({pets, handleDelete, handleEdit}) {
  return (
    <ul className="petsList">
      {pets.map(pet=><Pet key={pet._id} name={pet.name} breed={pet.breed} size={pet.size} id={pet._id} handleDelete={handleDelete} handleEdit={handleEdit}></Pet>)}
    </ul>
  )
}

export default PetsList
