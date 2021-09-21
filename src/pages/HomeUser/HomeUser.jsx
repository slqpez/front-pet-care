import React,{useEffect, useState} from 'react'
import PetsList from '../../components/PetsList/PetsList'
import {getPets, deletePet} from "../../services/pets"
import {useHistory} from "react-router-dom"


function HomeUser() {


  const history = useHistory()
  const[pets,setPets]=useState([])
  const [isDeleted, setIsDeleted]=useState(false)
  const token = localStorage.getItem("a_t")

  
  const handleDelete=async e=>{
    const id =e.target.getAttribute("data-id")
    await deletePet(id)
  }

  const handleEdit=e=>{
    const id =e.target.getAttribute("data-id")
    history.push(`/editPet/${id}`)
  }

  useEffect(() => {
    getPets(token)
    .then(data=> setPets(data))
  },[])

  return (
    <div>
      <PetsList pets={pets} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  )
}

export default HomeUser
