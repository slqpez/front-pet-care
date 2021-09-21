import React,{useState, useEffect} from 'react'
import {getPet, editPet} from "../../services/pets"
import {useParams, Link} from "react-router-dom"
import "./editPet.css"

function EditPet() {

  const {id}=useParams()


  const [inputData, setInputData] = useState({
    name:"",
    size:"",
    cares:""
  })

  useEffect(() => {
    getPet(id)
    .then(data=>setInputData(data))
  }, [])

  const  [petEdit, setPetEdit]= useState({})

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setPetEdit(inputData)
 
    const res =await editPet(id, inputData);
    console.log(res)
    window.location ="/" 
    
  }

  const handleInputs=(e)=>{
    setInputData({...inputData,[e.target.name]:e.target.value})
  }


  return (
    <div className="editContainer">
       <form onSubmit={handleSubmit} className="editForm" >
          <div className="inputs-container">
            <input
              className="input-createPet"
              type="text"
              name="name"
              onChange={handleInputs}
              placeholder="Nombre Mascota"
              value={inputData.name}
            />
           
            <input
              className="input-createPet"
              type="text"
              name="size"
              onChange={handleInputs}
              placeholder="Tamaño"
              value={inputData.size}
            />
            <input
              className="input-createPet"
              type="text"
              name="cares"
              onChange={handleInputs}
              placeholder="Cuidados"
              value={inputData.cares}
            />
          </div>
          <button className="btn-create">Editar</button>
        </form>
        <Link to="/">Volver</Link>
    </div>
  )
}

export default EditPet
