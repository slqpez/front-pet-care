import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createPet.css";

function CreatePet() {

  const [inputData, setInputData] = useState({
    nombre: "",
    raza: "",
    tamano: "",
    cuidados: "",
  });

  const vaccine = ['du', 'ff','dd', 'dd','dd'];
  const listVaccine = vaccine.map((vaccine) =>
    <li>{vaccine}</li>
  );


  
  const [message, setMessage] = useState({
    text: false,
    text: "",
    text: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
  };
  
  return (
    <div>
      <div className="pet-container">
       <Link className="back-btn" to="/">Volver ⬅</Link>
      {message.show ? (
        <Message text={message.text} type={message.type} />
      ) : null}
      <div className="CreatePet">
        
        <h2 className="title">Crear Mascota</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputs-container">
            <input
              className="input-createPet"
              type="text"
              name="nombre"
              onChange={handleInputs}
              placeholder="Nombre Mascota"
              value={inputData.nombre}
            />
            <input
              className="input-createPet"
              type="text"
              name="raza"
              onChange={handleInputs}
              placeholder="Raza"
              value={inputData.raza}
            />
            <input
              className="input-createPet"
              type="text"
              name="tamano"
              onChange={handleInputs}
              placeholder="Tamaño"
              value={inputData.tamano}
            />
            <input
              className="input-createPet"
              type="text"
              name="cuidados"
              onChange={handleInputs}
              placeholder="Cuidados"
              value={inputData.cuidados}
            />
          </div>
          <button className="btn-create">Añadir</button>
        </form>
      </div>
      {isLoading ? <Spinner></Spinner> : null}
    </div>
    </div>
   
  );
}

export default CreatePet;
