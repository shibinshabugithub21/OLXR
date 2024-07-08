// src/Pages/Signup.js
import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useHistory} from "react-router-dom";

import { firebaseContext } from "../../Store/FirebaseContext";

export default function Signup() {
  const history=useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { firebase } = useContext(firebaseContext); // Corrected from Firebase to firebase

  const handleSubmit = (e) => {
    e.preventDefault();
firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
  result.user.updateProfile({displayName: username}).then(()=>{
    firebase.firestore().collection('users').add({
      id:result.user.uid,
      username:username,
      phone:phone
    }).then(()=>{
      history.push("/login")
    })
  })
})
};

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            id="fname"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter the username"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            placeholder="Enter your phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a href="/login">Login</a> {/* Ensure this has a valid href */}
      </div>
    </div>
  );
}
