import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";
import { useHistory, Link, Switch, Route } from "react-router-dom";
import { getUser, getUsers } from "../services/users";
import "./home.css";
import HomeUser from "./HomeUser/HomeUser";
import flecha from "../images/flecha.png"

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const { setLogged } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("a_t");
    getUser(token)
      .then((data) => {
        if (data) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setLogged(false);
        }
      })
      .catch((err) => setLogged(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("a_t");
    getUsers(token).then((users) => setUsers(users));
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
      <header className="header-home">
        <div className="user-info-container">
          <div className="avatar-container">
            <img src={user.avatar} alt="User avatar" width="40" height="40" />
          </div>
          <h1>Bienvenido, {user.username}.</h1>
        </div>

        <div className="btn-container">
          <button className="btn-out" onClick={handleLogOut}>
            Salir
          </button>
        </div>
      </header>

      <section className="content">
        <aside className="aside close">
          <nav className="navbar-aside">
            <h2>PetCare</h2>

            <div className="flex-div">
              {user.role === 0 ? (
                <>
                  <Link to="/" className="item-aside">
                    Administrar empleados 💾
                  </Link>
                  <Link to="/register" className="item-aside">
                    Crear nuevo empleado ➕
                  </Link>
                </>
              ) : (
                <Link to="/newClient" className="item-aside">
                  Crear nuevo Cliente ➕
                </Link>
              )}
            </div>
            <div className="hamburger-container open ">
                <img className="hamburger-img" src={flecha} alt="" />
            </div>
            <Link to="/" className="item-aside profile">
              Mi perfil 👤
            </Link>
            <Link to="/" className="item-aside responsive-profile">
              {user.username} 👤
            </Link>
            <div className="btn-container btn-container-responsive ">
              <button className="btn-out btn-responsive" onClick={handleLogOut}>
                Salir
              </button>
            </div>
          </nav>
        </aside>
        {user.role === 0 ? (
          <main className="dashboard">
            <div>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <th scope="row">{user._id}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button data-id={user._id}>X</button>
                          <button data-id={user._id}>Y</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        ) : (
          <HomeUser />
        )}
      </section>

      {/*  <Link to="/register" className="btn-create">
        Crear nuevo empleado ➕
      </Link> */}
    </div>
  );
}

export default Home;
