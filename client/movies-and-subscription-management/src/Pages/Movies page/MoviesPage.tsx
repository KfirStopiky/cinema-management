import { Button, Stack } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import "./moviesPage.scss";

const MoviesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="movies-page-container">
      <Stack spacing={2} direction="row" className="btns-container">
        <Button onClick={() => navigate("/movies")} variant="contained">
          All Movies
        </Button>
        <Button onClick={() => navigate("/movies/add")} variant="outlined">
          Add Movie
        </Button>
      </Stack>
      <Outlet />
    </div>
  );
};

export default MoviesPage;
