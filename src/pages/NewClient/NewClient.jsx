import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./newClient.css";

function NewClient() {
  let valor = 1;

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
        <form action="">
          <div className="newClient-owner">
            <h2 className="newClient-subtitle__h2">
              Información del propietario
            </h2>
            <div className="newClient-card-container">
              <div className="newClient-card">
                <div className="newClient-owner-info">
                  <p> Información del dueño {valor}</p>
                  <p className="newClient-owner-info__icon">+</p>
                </div>
                <div className="newClient-inputs-container newClient-inputs-container__owner">
                  <input
                    type="text"
                    className="newClient-input"
                    name="ownerFirstname"
                    placeholder="Nombres"
                    required
                  />
                  <input
                    type="text"
                    className="newClient-input"
                    name="ownerLastname"
                    placeholder="Apellidos"
                    required
                  />
                  <input
                    type="text"
                    className="newClient-input"
                    name="ownerId"
                    placeholder="Cedula"
                    required
                  />
                  <input
                    type="number"
                    className="newClient-input"
                    name="ownerPhoneNumber"
                    placeholder="Numero de celular"
                    required
                  />
                  <input
                    type="email"
                    className="newClient-input"
                    name="ownerEmail"
                    placeholder="Correo electronico"
                    required
                  />
                  <input
                    type="text"
                    className="newClient-input"
                    name="ownerAddress"
                    placeholder="Direccion de residencia"
                    required
                  />
                </div>
              </div>
            </div>

            <button className="newClient-btn__add">
              Agregar más propietarios
            </button>
          </div>
          <div className="newClient-pet">
            <h2 className="newClient-subtitle__h2">
              Información de la mascota
            </h2>
            <div className="newClient-inputs-container">
              <input
                type="text"
                className="newClient-input"
                name="petName"
                placeholder="Nombre"
                required
              />
              <input
                type="text"
                className="newClient-input"
                name="petBreed"
                placeholder="Raza"
                required
              />
              <h3 className="newClient-subtitle__h3">Tamaño de la mascota</h3>
              <select className="petSize-container" name="petSize" required>
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
              <input
                type="text"
                className="newClient-input newClient-input-vaccination"
                name="vaccination"
                placeholder="Nombre de la vacuna"
              />
              <button className="newClient-btn__add">Agregar vacunas</button>
            </div>
          </div>
          <button className="btn-registrar">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default NewClient;
