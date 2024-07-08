import React,{useState,useContext} from 'react';
import {firebaseContext} from '../../Store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {useHistory} from 'react-router-dom'


function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const history=useHistory()
  const {firebase}=useContext(firebaseContext)
    const handleLogin=(e)=>{
      e.preventDefault()
      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        history.push('/')
      }).catch((error)=>{
        alert(error.message)
      })
    }
  
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            placeholder='Enter your email'
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            placeholder='Enter your password'
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
