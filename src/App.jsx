import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";
import AuthContext from "./context/AuthContext";
import Register from "./pages/Register/Register";
import Pets from "./pages/Pets/CreatePet";
import NewClient from "./pages/NewClient/NewClient";
import HomeUser from "./pages/HomeUser/HomeUser";
<<<<<<< HEAD
import EditUser from "./pages/EditUser/EditUser";
=======
import PetView from "./pages/PetView/PetView"
import EditPet from "./pages/EditPet/EditPet"
>>>>>>> df9f00c4c3e013e36b3df7b3c6c038d6435896b3

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    user ? setLogged(true) : setLogged(false);

  }, []);
console.log(user)
  return (
    <div className="App">
          <UserContext.Provider value={{ user, setUser }}>
      <AuthContext.Provider value={{ logged, setLogged }}>
        <Switch>
          <Route exact path="/">
            {logged ? <Home /> : <Login />}
          </Route>
          <Route exact path="/login">
            {logged ? <Home /> : <Login />}
          </Route>

          <Route exact path="/register">
            {logged ? <Register /> : <Login />}
          </Route>
          <Route exact path="/newClient">
            {logged ? <NewClient /> : <Login />}
          </Route>
<<<<<<< HEAD
          <Route exact path="/editUser/:id">
            {logged ? <EditUser /> : <Login />}
          </Route>
=======
          <Route exact path="/pet/:id">
            {logged ? <PetView /> : <Login />}
          </Route>

          <Route exact path="/editPet/:id">
            {logged ? <EditPet /> : <Login />}
          </Route>

>>>>>>> df9f00c4c3e013e36b3df7b3c6c038d6435896b3
        </Switch>
      </AuthContext.Provider>
    </UserContext.Provider>
    </div>
  );
}

export default App;
