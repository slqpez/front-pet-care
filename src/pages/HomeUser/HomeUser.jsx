import React, { useEffect, useState } from "react";
import PetsList from "../../components/PetsList/PetsList";
import { getPets, deletePet } from "../../services/pets";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function HomeUser() {
  const history = useHistory();
  const [pets, setPets] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("a_t");

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data-id");
    swal("¿Estás seguro que quieres eliminar el perro?", {
      buttons: ["Cancelar", "Sí, eliminar"],
    }).then((value) => {
      if (value) {
        deletePet(id)
          .then((res) => {
            swal(`Eliminaste el perro.`, {
              icon: "success",
            });
            setIsDeleted(!isDeleted);
          })
          .catch((res) => {
            swal(`No se pudo elimiar el perro..`, {
              icon: "error",
            });
          });
      }
    });
  };

  const handleEdit = (e) => {
    const id = e.target.getAttribute("data-id");
    history.push(`/editPet/${id}`);
  };

  const [pager, setPager] = useState(1);

  useEffect(() => {
    setLoading(true);
    getPets(token).then((data) => setPets(data.slice(pager - 1, pager + 2)));
    setLoading(false);
  }, [pager, isDeleted]);

  const handlePagerNext = () => {
    setPager(pager + 3);
  };

  const handlePagerPrevious = () => {
    if (pager === 1) {
    } else if (pager > 0) {
      setPager(pager - 3);
    }
  };

  if (pets.length === 0)
    return (
      <div>
        <p>Aún no hay perros inscritos.</p>{" "}
        <div className="btn-pages-container">
          <button className="btn-previous" onClick={handlePagerPrevious}>
            Anterior
          </button>
          <button className="btn-next" onClick={handlePagerNext}>
            Siguiente
          </button>
        </div>
      </div>
    );

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <PetsList
          pets={pets}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      <div className="btn-pages-container">
        <button className="btn-previous" onClick={handlePagerPrevious}>
          Anterior
        </button>
        <button className="btn-next" onClick={handlePagerNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default HomeUser;
