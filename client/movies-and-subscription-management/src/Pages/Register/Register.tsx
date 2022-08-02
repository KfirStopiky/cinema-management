import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./register.scss";
import { register } from "../../Services/AuthService";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await register(firstName, lastName, userName, password);
    if (resp.data.error === false) {
      navigate("/");
    } else {
      alert(resp.data.message);
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setFirstName(e.target.value)}
          id="firstName"
          label="First name"
          variant="outlined"
        />{" "}
        <br />
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setLastName(e.target.value)}
          id="lastName"
          label="Last name"
          variant="outlined"
        />{" "}
        <br />
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setUserName(e.target.value)}
          id="Username"
          label="Username"
          variant="outlined"
        />{" "}
        <br />
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setPassword(e.target.value)}
          id="Password"
          label="Password"
          variant="outlined"
        />{" "}
        <br />
        <button type="submit">Sign Up!</button>
      </form>
      <div className="new-user">
        <p>
          <Link to={"/"}>Go Back</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
