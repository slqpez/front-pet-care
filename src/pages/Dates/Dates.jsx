import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { editPet, getPet } from "../../services/pets";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { Link } from "react-router-dom";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "./dates.css";

function Dates() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [inputsData, setInputsData] = useState({
    allergies: "",
    findings: "",
  });

  const token = localStorage.getItem("a_t");
  const { id } = useParams();
  const history = useHistory();

  console.log(selectedDate);

  useEffect(() => {
    getPet(id, token).then((data) => {
      setInputsData({ allergies: data.allergies, findings: data.findings });
    });
  }, []);

  useEffect(() => {
    editPet(id, { date: selectedDate.toUTCString() })
      .then((data) => console.log(data))
      .catch(() => console.log("No se pudo agendar la cita"));
  }, [selectedDate]);

  const handleInput = async (e) => {
    setInputsData({ ...inputsData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    await editPet(id, {
      allergies: inputsData.allergies,
      findings: inputsData.findings,
    });
    history.push(`/pet/${id}`);
  };

  return (
    <div className="dates-flex">
      <Link className="back-btn-dates" to="/">
        Volver ⬅
      </Link>
      <div className="citeContainer">
        <div className="datesCite">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className="fecha"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <TimePicker
              className="fecha"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <DateTimePicker
              className="hora"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="infoContainer-dates">
          <label htmlFor="allergies">Alergias: </label>
          <textarea
            type="text"
            id="allergies"
            name="allergies"
            onChange={handleInput}
            value={inputsData.allergies}
          />
          <label htmlFor="findings">Hallazgos: </label>
          <textarea
            type="text"
            id="findings"
            name="findings"
            onChange={handleInput}
            value={inputsData.findings}
          />
        </div>
        <button className="btnEdit" onClick={handleSave}>
          Guardar y volver
        </button>
      </div>
    </div>
  );
}

export default Dates;
