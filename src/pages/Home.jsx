import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { getUser } from "../services/users";
import "./home.css";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const { setLogged } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("a_t");
    getUser(token)
      .then((data) => {
        if(data){
          setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        }else{
          setLogged(false);
        }
        
      })
      .catch(err=> setLogged(false));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("a_t");
    localStorage.removeItem("r_t");
    localStorage.removeItem("user");
    setLogged(false);
    window.location.href = "/login";
  };

  return (
    <div className="Home">
      <h1>Bienvenido, {user.username}.</h1>

      <Link to="/register" className="btn-create">
        Crear nuevo empleado ➕
      </Link>
      <button className="btn-out" onClick={handleLogOut}>
        Salir
      </button>
    </div>
  );
}

export default Home;
