import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPet, editPet } from "../../services/pets";
import { getOwner } from "../../services/owners";
import "./petView.css";

function PetView() {
  const [pet, setPet] = useState({});
  const [owner, setOwner] = useState({});
  const [idOwner, setIdOwner] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("a_t");

  useEffect(() => {
    getPet(id, token).then((data) => {
      setPet(data);
      getOwner(data.owners[0], token).then((ownerData) => setOwner(ownerData));
    });
  }, []);


  const handleCheck = async (e)=>{
    await editPet(id, {bathed:e.target.checked})
  }



  return (
    <div className="petView-wrapper">
      <div className="petViewContainer">
        <Link to="/">Volver</Link>
        <div className="petView">
          <h2>{pet?.name}</h2>
          <p>Raza: {pet?.breed}</p>
          <p>Tamaño: {pet?.size}</p>
          <p>Edad: {pet?.age}</p>
          <p>Cuidados: {pet?.cares}</p>
          <p>Vacunas:</p>
          {pet?.vaccination ? (
            pet?.vaccination.map((vacc, i) => {
              return <li key={i}>{vacc}</li>;
            })
          ) : (
            <p>No tiene vacunas</p>
          )}

          <h3>Propietario</h3>
          {owner ? (
            <div className="ownerPetView">
              <p>Nombre: {owner?.name}</p>
              <p>Apellido: {owner?.lastName}</p>
              <p>Teléfono: {owner?.phone}</p>
              <p>Correo: {owner?.email}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="bathed">¿Bañado?</label>
        <input type="checkbox" id="bathed" name="bathed" onChange={handleCheck}/>
        <Link to={`/dates/${id}`}>{pet.date?"Editar cita":"Agendar baño"}</Link>

        <p>Alergias: {pet?.allergies}</p>
        <p>Hallazgos: {pet?.findings}</p>
        <p>Cita programada: {pet.date?pet?.date:"Aún no tiene cita"}</p>
      </div>
    </div>
  );
}

export default PetView;
