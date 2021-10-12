import React, { useState, useContext } from "react";
import ClientForm from "../../components/ClientForm/ClientForm";
import { Link } from "react-router-dom";
import { createOwner } from "../../services/owners";
import { createPet } from "../../services/pets";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import "./newClient.css";


const customId = "custom-id-yes";

function NewClient() {
  const user = JSON.parse(localStorage.getItem("user"));

  //const [clientsForm, setClientsForm] = useState(["p"]);
  const [vaccinationList, setVaccinationList] = useState([]);
  const [vaccArray, SetVaccArray] = useState({});
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    size: "",
    age: "",
    cares: "",
    vaccination: [],
  });
  const [error,setError]= useState({
    iserror : false,
    message: ""
  });

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    createdBy: "",
    updatedBy: "",
    document: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOner = {
      ...userData,
      createdBy: user.username,
    };
    const ownerCreated = await createOwner(newOner);
    console.log(ownerCreated)

    const newPet = {
      ...petData,
      vaccination: Object.values(vaccArray),
      owners: [ownerCreated._id],
    };
    console.log(newPet);
    const petCreated = await createPet(newPet);
    if(petCreated.message){
      toast.error('Completa todos los campos.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId
        });
    }else{
      toast.success('Cliente y mascota agregados correctamente.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId
        });
        window.scrollTo(0, 0);
    }
  };

  const handleInputsPet = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleCreateNewOwner = () => {
    console.log("Crear otro form");
  };

  const handleVacc = () => {
    setVaccinationList([...vaccinationList, "v"]);
  };

  const handleSize = (e) => {
    setPetData({ ...petData, size: e.target.value });
  };

  const handleInputVacc = (e) => {
    SetVaccArray({ ...vaccArray, [e.target.name]: e.target.value });
    //setPetData({ ...petData, vaccination: test });
  };

  const handleCLientsForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="newClient-container">
      <Link className="back-btn" to="/">
        Volver ⬅
      </Link>
      <div className="newClient-title-container">
        <h1 className="newClient-title-container__h1">
          Formulario de registro
        </h1>
      </div>
      <div className="newClient-form-container">
        <form onSubmit={handleSubmit}>
          <div className="newClient-owner">
            <h2 className="newClient-subtitle__h2">
              Información del propietario
            </h2>
            <ClientForm
              handleCLientsForm={handleCLientsForm}
              userData={userData}
            />
            <button
              className="newClient-btn__add"
              type="button"
              onClick={handleCreateNewOwner}
            >
              Agregar más propietarios
            </button>
          </div>
          <div className="newClient-pet">
            <h2 className="newClient-subtitle__h2">
              Información del perro
            </h2>
            <div className="newClient-inputs-container">
              <input
                type="text"
                className="newClient-input"
                name="name"
                placeholder="Nombre"
                value={petData.name}
                onChange={handleInputsPet}
              />
              <input
                type="text"
                className="newClient-input"
                name="breed"
                placeholder="Raza"
                value={petData.breed}
                onChange={handleInputsPet}
              />
              <input
                type="text"
                className="newClient-input"
                name="age"
                placeholder="Edad"
                value={petData.age}
                onChange={handleInputsPet}
              />
              <textarea
                type="text"
                className="newClient-input"
                name="cares"
                placeholder="Cuidados"
                value={petData.cares}
                onChange={handleInputsPet}
              />
              <h3 className="newClient-subtitle__h3">Tamaño del perro</h3>
              <select
                className="petSize-container"
                name="petSize"
                value={petData.size}
                onChange={handleSize}
              >
                <option value="pequeño" className="petSize-choise">
                  Pequeño
                </option>
                <option value="Mediano" className="petSize-choise">
                  Mediano
                </option>
                <option value="Grande" className="petSize-choise">
                  Grande
                </option>
              </select>
              <h3 className="newClient-subtitle__h3">Vacunas</h3>

              {vaccinationList.length > 0
                ? vaccinationList.map((vacc, i) => (
                    <input
                      key={i}
                      type="text"
                      className="newClient-input newClient-input-vaccination"
                      name={`vaccination${i}`}
                      placeholder="Nombre de la vacuna"
                      onChange={handleInputVacc}
                    />
                  ))
                : null}

              <button
                className="newClient-btn__add"
                type="button"
                onClick={handleVacc}
              >
                Agregar vacunas
              </button>
            </div>
          </div>
          <button className="btn-registrar">Registrar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewClient;
