import React from "react";
import Login from "../Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../HomePage/Home";

const Main: React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Main;
