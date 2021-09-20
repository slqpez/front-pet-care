import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/utils/Message";
import Spinner from "../../components/utils/Spinner/Spinner";
import "./register.css";

function Register() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState({
    show: false,
    text: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    fetch("https://petcareiw.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    })
      .then((res) => res.json())
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
                type="text"
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
