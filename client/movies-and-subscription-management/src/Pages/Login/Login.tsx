import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import TextField from "@mui/material/TextField";
import axios from "axios";

const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = await axios.post(`http://localhost:5000/api/auth/register`, {
      userName,
      password,
    });
    console.log(data);
  };
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setUserName(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>
      <div className="new-user">
        <p>
          New user? : <Link to={"/register"}> Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
