import React from "react";
import { Outlet } from "react-router";
import "./moviesPage.scss";

const MoviesPage: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MoviesPage;
