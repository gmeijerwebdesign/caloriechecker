import React, { useState } from "react";
import axios from "axios";
import "../css/auth/register.css";
import blob from "../images/blob1.png";
import { IoMdContact } from "react-icons/io";
import GetURL from "../utils/getURL";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${GetURL()}/auth/register`, {
        username,
        password,
        kcal,
        protein,
      });
      console.log("Successfully registered user");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="magicpattern">
      <img src={blob} alt="Blob" className="blob" />
      <div className="form">
        <form method="POST" onSubmit={handleFormSubmit} className="auth-form">
          <div className="icon-holder">
            <IoMdContact />
          </div>
          <p>Username</p>
          <input
            type="text"
            name="username"
            className="auth-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="numbers">
            <div className="numb">
              <p>Calories (kcal)</p>
              <input
                type="number"
                name="kcal"
                onChange={(e) => setKcal(e.target.value)}
              />
            </div>
            <div className="numb">
              <p>Protein (g)</p>
              <input
                type="number"
                name="protein"
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Register</button>
          <a href="/login">Login</a>
        </form>
      </div>
    </div>
  );
}

export default Register;
