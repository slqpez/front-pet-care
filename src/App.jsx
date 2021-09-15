import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import UserContext from "./context/UserContext";
import AuthContext from "./context/AuthContext";
import Register from "./pages/Register/Register";

function App() {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    user ? setLogged(true) : setLogged(false);
  }, []);

  return (
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
        </Switch>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
