import React, { useEffect, useState } from "react";
import "./movies.scss";
import { getAllItems } from "../../Services/requests";
import Movie from "../Movie/Movie";
import { MovieType } from "../../Types/movie";
import { getToken } from "../../Services/AuthService";
import { useNavigate } from "react-router";

const Movies: React.FC = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    setMovies(resp.data);
  };

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((movie: MovieType, i: number) => {
        return <Movie key={i} movie={movie} getMovies={getMovies} />;
      })}
    </>
  );
};

export default Movies;
