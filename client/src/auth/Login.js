import axios from "axios";
import React, { useState } from "react";
import "../css/auth/register.css";
import blob from "../images/blob1.png";
import { IoMdContact } from "react-icons/io";
import GetURL from "../utils/getURL";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${GetURL()}/auth/login`, {
        username,
        password,
      });
      console.log("succesfully logged in");
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (err) {
      setErrMsg("username or password incorrect");
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
          <p>username</p>
          <input
            type="text"
            name="username"
            className="auth-input"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p>{errMsg}</p>
          <button type="submit">submit</button>
          <a href="/register">register</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
