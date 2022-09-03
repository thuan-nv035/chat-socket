import React, { useState } from 'react'
import { authService } from '../services/authService'
import { useHistory } from "react-router-dom";
import makeToast from "../Toaster";
import { withRouter } from "react-router-dom";
const  LoginPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory();
  const loginUser = async() => {
    try {
      const res = await authService.login({
        email: email,
        password: password
      })
      makeToast("success", res.data.message);
      localStorage.setItem('token', res.data.token)
      history.push("/dashboard")
      props.setupSocket()
    }catch(err) {
      console.error(err)
    }
  }
  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}  
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={loginUser} >Login</button>
      </div>
    </div>
  )
}

export default withRouter(LoginPage)
