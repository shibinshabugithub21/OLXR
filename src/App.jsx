import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import "./App.css";
import Post from "./Store/PostContext";
import Home from "./Pages/Home";
import { AuthContext, firebaseContext } from "./Store/FirebaseContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(firebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/view">
            <View />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
