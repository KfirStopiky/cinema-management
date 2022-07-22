import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./register.scss";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
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