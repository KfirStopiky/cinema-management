import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import TextField from "@mui/material/TextField";
import { login, saveToken } from "../../Services/AuthService";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../Redux/userSlice";
import jwt_decode from "jwt-decode";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await login(userName, password);
    if (resp.data.error === false) {
      let token: string = resp.data.access_token;
      saveToken(token);
      let decodedToken: any = jwt_decode(token);
      if (decodedToken) {
        let userDetails = decodedToken.user;
        dispatch(
          LOGIN({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            sessionTimeOut: userDetails.sessionTimeOut,
            userName: userDetails.userName,
            permissions: userDetails.permissions,
            isLoggedIn: true,
          })
        );
      }
      navigate("/");
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
