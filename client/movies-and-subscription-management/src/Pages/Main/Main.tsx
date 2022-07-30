import React from "react";
import Login from "../Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../HomePage/Home";
import UserManagement from "../Users Management Page/UserManagement";

const Main: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-users" element={<UserManagement />} />
      </Routes>
    </div>
  );
};

export default Main;
