import React, { useEffect, useState } from "react";
import "./movies.scss";
import { getAllItems } from "../../Services/requests";
import Movie from "../Movie/Movie";
import { MovieType } from "../../Types/movie";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    setMovies(resp.data);
  };

  useEffect(() => {
    getMovies();
  }, [movies]);

  return (
    <>
      <h1>Movies</h1>
      <Stack spacing={2} direction="row">
        <Button onClick={() => navigate("/movies")} variant="contained">
          All Movies
        </Button>
        <Button onClick={() => navigate("/movies/add")} variant="outlined">
          Add Movie
        </Button>
      </Stack>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          id="standard-basic"
          label="Search a movie"
          variant="standard"
        />
      </Box>
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
      {/* <div className="movies-container">
        {movies.map((movie: MovieType, i: number) => {
          return <Movie key={i} movie={movie} getMovies={getMovies} />;
        })}
      </div> */}
    </>
  );
};

export default Movies;
