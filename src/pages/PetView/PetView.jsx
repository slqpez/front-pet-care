import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPet } from "../../services/pets";
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
    });
  }, []);

  useEffect(() => {
    if (pet) {
      //console.log(pet.owners[0])
      /* setIdOwner(pet.owners[0]); */
      //getOwner(idOwner, token).then((data) => setOwner(data));
    } else {
      console.log("mal");
    }
    /* if (pet) {
     
    } */
  }, [pet]);

  return (
    <div>
      <div className="petView-container">
        <Link to="/" className="back-btn">Volver ⬅</Link>
        <div className="petView">
          <h2>{pet.name}</h2>
          <p>Raza: {pet.breed}</p>
          <p>Tamaño: {pet.size}</p>
          <p>Edad: {pet.age}</p>
          <p>Cuidados: {pet.cares}</p>
          <p>Vacunas:</p>
          {pet.vaccination ? (
            pet.vaccination.map((vacc, i) => {
              return <li key={i}>{vacc}</li>;
            })
          ) : (
            <p>No tiene vacunas</p>
          )}

          <h3>Propietario</h3>
          {owner ? (
            <div className="ownerPetView">
              <p>Nombre: {owner.name}</p>
              <p>Apellido: {owner.lastName}</p>
              <p>Teléfono: {owner.phone}</p>
              <p>Correo: {owner.email}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PetView;
