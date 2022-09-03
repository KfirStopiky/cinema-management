import React, { useEffect, useState } from "react";
import "./movies.scss";
import { getAllItems } from "../../Services/requests";
import Movie from "../Movie/Movie";
import { MovieType } from "../../Types/movie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    setMovies(resp.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <TextField
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
        id="standard-basic"
        label="Search a movie"
        variant="standard"
      />
      <div className="movies-container">
        {movies
          // eslint-disable-next-line array-callback-return
          .filter((val: any) => {
            if (val === "") {
              return val;
            } else if (
              val.Name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((movie: MovieType, i: number) => {
            return <Movie key={i} movie={movie} getMovies={getMovies} />;
          })}
      </div>
    </>
  );
};

export default Movies;
