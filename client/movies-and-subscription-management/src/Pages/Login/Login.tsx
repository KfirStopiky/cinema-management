import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import TextField from "@mui/material/TextField";
import { login, saveToken } from "../../Services/AuthService";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await login(userName, password);
    if (resp.data.error === false) {
      let token: String = resp.data.access_token;
      saveToken(token);
      navigate("/home");
    } else {
      alert(resp.data.message);
    }
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
          label="Username"
          variant="outlined"
        />
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
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
