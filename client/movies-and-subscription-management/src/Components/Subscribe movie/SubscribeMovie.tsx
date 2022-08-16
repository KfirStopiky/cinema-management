import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addItem, getAllItems } from "../../Services/requests";
import "./subscribeMovie.scss";
const SubscribeMovie: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (memberObj: any) => {
    console.log(memberObj);
    let resp = await addItem(
      "http://localhost:5000/api/susbcription",
      memberObj
    );
    console.log(resp);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMovie(event.target.value);
  };

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    console.log(resp.data);
    setMovies(resp.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1>Add a new movie</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setDate(e.target.value)}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="date"
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Movie</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={movie}
            onChange={handleChange}
            autoWidth
            label="Movie"
          >
            {movies &&
              movies.map((movie: any, i) => {
                return (
                  <MenuItem key={i} value={movie.Name}>
                    {movie.Name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeMovie;