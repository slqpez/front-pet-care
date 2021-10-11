import React, { useState, useEffect } from "react";
import { getPet, editPet } from "../../services/pets";
import { useParams, Link } from "react-router-dom";
import "./editPet.css";

function EditPet() {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    name: "",
    size: "",
    cares: "",
  });

  useEffect(() => {
    getPet(id).then((data) => setInputData(data));
  }, []);

  const [petEdit, setPetEdit] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPetEdit(inputData);

    const res = await editPet(id, inputData);
    console.log(res);
    window.location = "/";
  };

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="editPetContainer">
      <Link to="/" className="back-btn">
        Volver ⬅
      </Link>
      <div className="editPet">
        <h2 className="editPet-title">Actualizar Mascota</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs-container-editPet">
            <input
              className="input-editPet"
              type="text"
              name="name"
              onChange={handleInputs}
              placeholder="Nombre Mascota"
              value={inputData.name}
            />

            <input
              className="input-editPet"
              type="text"
              name="size"
              onChange={handleInputs}
              placeholder="Tamaño"
              value={inputData.size}
            />
            <textarea
              className="input-editPet"
              type="text"
              name="cares"
              onChange={handleInputs}
              placeholder="Cuidados"
              value={inputData.cares}
            />
          </div>
          <button className="btn-create">Editar</button>
        </form>
      </div>
    </div>
  );
}

export default EditPet;
