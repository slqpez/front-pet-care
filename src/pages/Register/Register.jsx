import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/utils/Message";
import Spinner from "../../components/utils/Spinner/Spinner";
import { registerUser } from "../../services/users";
import "./register.css";

function Register() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    email: "",
    role:0
  });
  const [message, setMessage] = useState({
    show: false,
    text: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const token=localStorage.getItem("a_t")

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleRol =(e)=>{
    setInputData({ ...inputData, role:Number(e.target.value)})
  }


  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    registerUser(inputData,token)
      .then((data) => {
        setIsLoading(false);
        if (data.created) {
          setMessage({ type: "success", text: data.msg, show: true });
          setInputData({ username: "", password: "", email: "" });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 2000);
        } else {
          setMessage({ type: "error", text: data.msg, show: true });
          setTimeout(() => {
            setMessage({ ...message, show: false });
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="login-container">
        <Link className="back-btn" to="/">
          Volver ⬅
        </Link>
        {message.show ? (
          <Message text={message.text} type={message.type} />
        ) : null}
        <div className="Login">
          <h2 className="login-title">Resgistrar</h2>

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
              <input
                className="input-login"
                type="password"
                name="password"
                onChange={handleInputs}
                placeholder="Contraseña"
                value={inputData.password}
              />
              <select name="select" onChange={handleRol}>
                <option value="0" >0: Administrador</option>
                <option value="1" >1: Asistente de gerencia</option>
                <option value="2" >2: Gerente financiero</option>
                <option value="3" >3: Asistente financiero</option>
                <option value="4" >4: Director de guaerdería</option>
                <option value="5" >5: Profesor de guardería</option>
                <option value="6" >6: Conductor de transporte</option>     
              </select>
            </div>
            <button className="btn-login">Registrar</button>
          </form>
        </div>
        {isLoading ? <Spinner></Spinner> : null}
      </div>
    </div>
  );
}

export default Register;
