import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import {getUserByID, editUser} from "../../services/users.js"

function EditUser() {
  const { id } = useParams();
  const token = localStorage.getItem("a_t");
  const [edited,setEdited] = useState(false)

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() =>{
    getUserByID(token, id)
      .then(data => setInputData(data))
  }, [])

  const [userEdit, setUserEdit] = useState({});

 

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };


  const handleRol =(e)=>{
    setInputData({ ...inputData, role:Number(e.target.value)})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserEdit(inputData);

    try{
      const res = await editUser(id, token, inputData);
      setEdited(true);
      setTimeout(() => {
        setEdited(false)
      },2000)
    }catch(e){
      console.log(err)
    }
   
   };

  return (
    <div>
      <Link className="back-btn" to="/">
        Volver ⬅
      </Link>
      <div className="Login">
        <h2 className="login-title">Actualizar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <input
              className="input-login"
              type="text"
              name="username"
              onChange={handleInputs}
              placeholder="Nombre de usuario"
              value={inputData.username}
            />
            <input
              className="input-login"
              type="email"
              name="email"
              onChange={handleInputs}
              placeholder="Correo"
              value={inputData.email}
            />

            <select name="select" onChange={handleRol}>
              <option value="0">0: Administrador</option>
              <option value="1">1: Asistente de gerencia</option>
              <option value="2">2: Gerente financiero</option>
              <option value="3">3: Asistente financiero</option>
              <option value="4">4: Director de guaerdería</option>
              <option value="5">5: Profesor de guardería</option>
              <option value="6">6: Conductor de transporte</option>
            </select>
          </div>
          <button className="btn-login">Actualizar</button>
        </form>
        {edited?<p>Usuario actualizado correctamente.</p>:null}
      </div>
    </div>
  );
}

export default EditUser;
