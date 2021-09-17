import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { getUser, getUsers } from "../services/users";
import "./home.css";


function Home() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([])
  const { setLogged } = useContext(AuthContext);
  let history = useHistory();

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
    getUsers(token)
    .then((users) => setUsers(users))
  },[users])

  console.log(user);

  const handleLogOut = () => {
    localStorage.removeItem("a_t");
    localStorage.removeItem("r_t");
    localStorage.removeItem("user");
    setLogged(false);
    window.location.href = "/login";
  };

  return (
    <div className="Home">
      <header>
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
        <aside>
          <nav className="navbar-aside">
            <div>
              <Link to="/" className="item-aside">
                Administrar empleados 💾
              </Link>
              <Link to="/register" className="item-aside">
                Crear nuevo empleado ➕
              </Link>
            </div>
            <Link to="/register" className="item-aside">
              Mi perfil 👤
            </Link>
          </nav>
        </aside>

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
                {users.map(user=>{
                  return(
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
                  )
                })}
               
              </tbody>
            </table>
          </div>
        </main>
      </section>

      {/*  <Link to="/register" className="btn-create">
        Crear nuevo empleado ➕
      </Link> */}
    </div>
  );
}

export default Home;
