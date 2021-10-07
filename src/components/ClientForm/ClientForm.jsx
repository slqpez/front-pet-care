import React from "react";
import "./clientForm.css";


function ClientForm({handleCLientsForm, userData}) {

  return (
    <div className="newClient-owner-container">
      <details className="newClient-owner__details">
        <summary className="newClient-owner-info">
          <p> Información del dueño </p>
          <p className="newClient-owner-info__icon"> +</p>
        </summary>
        <div className="newClient-inputs-container newClient-inputs-container__owner">
          <input
            type="text"
            className="newClient-input"
            name="name"
            placeholder="Nombres"
            id="ownerFirstname"
            onChange={handleCLientsForm}
            value={userData.name}
           
          />
          <input
            type="text"
            className="newClient-input"
            name="lastName"
            placeholder="Apellidos"
            onChange={handleCLientsForm}
            value={userData.lastName}
          />
          <input
            type="text"
            className="newClient-input"
            name="document"
            placeholder="Cedula"
            onChange={handleCLientsForm}
            value={userData.document}
            
          />
          <input
            type="number"
            className="newClient-input"
            name="phone"
            placeholder="Numero de celular"
            onChange={handleCLientsForm}
            value={userData.phone}
            
          />
          <input
            type="email"
            className="newClient-input"
            name="email"
            placeholder="Correo electronico"
            onChange={handleCLientsForm}
            value={userData.email}
            
          />
          <input
            type="text"
            className="newClient-input"
            name="address"
            placeholder="Direccion de residencia"
            onChange={handleCLientsForm}
            value={userData.address}
          />
        </div>
      </details>
    </div>
  );
}

export default ClientForm;
