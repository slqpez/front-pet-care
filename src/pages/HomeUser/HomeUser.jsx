import React,{useEffect, useState} from 'react'
import PetsList from '../../components/PetsList/PetsList'
import {getPets, deletePet} from "../../services/pets"
import {useHistory} from "react-router-dom"
import swal from 'sweetalert';


function HomeUser() {


  const history = useHistory()
  const[pets,setPets]=useState([])
  const [isDeleted, setIsDeleted]=useState(false)
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem("a_t")

  
  const handleDelete= e=>{
    const id =e.target.getAttribute("data-id")
    swal("¿Estás seguro que quieres eliminar el perro?", {
      buttons: ["Cancelar", "Sí, eliminar"],
    }).then((value) => {
      if (value) {
        deletePet(id)
          .then((res) => {
            swal(`Eliminaste el perro.`, {
              icon: "success",
            })
            setIsDeleted(!isDeleted)
          })
          .catch((res) => {
            swal(`No se pudo elimiar el perro..`, {
              icon: "error",
            });
          });
      }
    });
  }

  const handleEdit=e=>{
    const id =e.target.getAttribute("data-id")
    history.push(`/editPet/${id}`)
  }

  useEffect(() => {
    setLoading(true)
    getPets(token)
    .then(data=> setPets(data))
    setLoading(false)
  },[isDeleted])

  if(pets.length === 0) return <p>Aún no hay perros inscritos.</p>

  return (
    <div>
      {loading?<p>Cargando...</p>:<PetsList pets={pets} handleDelete={handleDelete} handleEdit={handleEdit}/>}
      
    </div>
  )
}

export default HomeUser
