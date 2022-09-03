import React, { useState } from "react";
import { authService } from "../services/authService";
import makeToast from "../Toaster";
import { useHistory } from "react-router-dom";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const registerUser = async (props) => {
    try {
      const response = await authService.register({
        email: email,
        password: password,
        name: name,
      });
      makeToast("success", response.data.message);
      history.push("/login")
    } catch (e) {
      console.log(e);
      makeToast("error", e.response.data.message);
    }
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abc@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={registerUser}>Register</button>
    </div>
  );
}
