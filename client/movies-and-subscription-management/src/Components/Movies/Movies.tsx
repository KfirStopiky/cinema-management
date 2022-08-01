import React, { useEffect, useState } from "react";
import "./movies.scss";
import { getAllItems } from "../../Services/requests";
import Movie from "../Movie/Movie";
import { MovieType } from "../../Types/movie";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    setMovies(resp.data);
  };

  useEffect(() => {
    getMovies();
  });

  return (
    <>
      <h1>Movies</h1>
      {movies.map((movie: MovieType, i: number) => {
        return <Movie key={i} movie={movie} />;
      })}
    </>
  );
};

export default Movies;
