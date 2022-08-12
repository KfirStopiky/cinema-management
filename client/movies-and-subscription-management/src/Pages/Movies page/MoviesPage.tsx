import React from "react";
import { Outlet, useNavigate } from "react-router";
import "./moviesPage.scss";

const MoviesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Moviesaaaa</h1>
      <div className="btns">
        <button onClick={() => navigate("/movies")}>All Movies</button>
        <button onClick={() => navigate("/movies/add")}>Add Movie</button>
      </div>
      <Outlet />
    </div>
  );
};

export default MoviesPage;
