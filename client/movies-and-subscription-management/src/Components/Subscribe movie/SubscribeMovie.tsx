import {
  Button,
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

interface memberProps {
  member: {
    _id: string;
    Name: string;
    Email: string;
    City: string;
    Watched_movies: any;
  };
}

const SubscribeMovie: React.FC<memberProps> = ({ member }) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (memberObj: any) => {
    console.log(memberObj);
    await addItem("http://localhost:5000/api/susbcription", memberObj);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target);
    setMovie(event.target.value);
  };

  const getMovies = async () => {
    let resp = await getAllItems("http://localhost:5000/api/movies");
    setMovies(resp.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <h1 className="header">Add a new movie</h1>
      <form
        className="movie-subscription-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        <TextField
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setDate(e.target.value)}
          id="outlined-basic"
          variant="outlined"
          type="date"
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Movie</InputLabel>
          <Select value={movie} onChange={handleChange} autoWidth label="Movie">
            {movies &&
              movies.map((movie: any, i) => {
                return (
                  <MenuItem key={i} value={movie._id}>
                    {movie.Name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </form>
      <div className="subscribe-btn">
        <Button
          variant="contained"
          onClick={() =>
            handleSubmit({
              MemberId: member._id,
              memberName: member.Name,
              movieID: movie,
              watching_date: date,
            })
          }
          type="submit"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default SubscribeMovie;
