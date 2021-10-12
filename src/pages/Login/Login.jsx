import React, { useState, useContext } from "react";
import Message from "../../components/utils/Message";
import {Link} from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import Spinner from "../../components/utils/Spinner/Spinner";
import { login } from "../../services/auth";
import "./login.css";

function Login() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    text: "",
    type: "error",
  });
  const [isLoading, setIsLoading] = useState(false);

  const {setLogged} = useContext(AuthContext)

  const handleInputs = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
       login(inputData)
      .then((data) => {
        setIsLoading(false);
         if (data.a_t) {
          localStorage.setItem("r_t", data.r_t);
          localStorage.setItem("a_t", data.a_t);
          setLogged(true)
          window.location = "/";
        } else {
          setError({ ...error, text: data.msg, isError: true });
          setTimeout(() => {
            setError({ ...error, isError: false });
          }, 2000);
        } 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      {error.isError ? <Message text={error.text} type={error.type} /> : null}
      <div className="Login">
        <h2 className="login-title">Ingresar</h2>

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
              type="password"
              name="password"
              onChange={handleInputs}
              placeholder="Contraseña"
              value={inputData.password}
            />
          </div>

          <button type="submit" className="btn-login">Ingresar</button>

          <Link to="/sendEmail">¿Eres cliente?</Link>
        </form>
      </div>
      {isLoading ? <Spinner></Spinner> : null}
    </div>
  );
}

export default Login;
