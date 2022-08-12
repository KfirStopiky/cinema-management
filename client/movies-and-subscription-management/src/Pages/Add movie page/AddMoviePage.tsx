import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { addItem } from "../../Services/requests";
import "./addMoviePage.scss";

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState<{
    name: string;
    imageUrl: string;
    premiered: string;
    genres?: string | [];
  }>({
    name: "",
    imageUrl: "",
    premiered: "",
    genres: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await addItem("http://localhost:5000/api/movies", movieDetails);
    console.log(movieDetails);
    if (resp.data.error === false) {
      navigate("/movies");
    } else {
      alert(resp.data.message);
    }
  };

  return (
    <div>
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMovieDetails({ ...movieDetails, name: e.target.value })}
            id="name"
            label="name"
            variant="outlined"
          />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMovieDetails({ ...movieDetails, genres: e.target.value })}
            id="genres"
            label="genres"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMovieDetails({ ...movieDetails, imageUrl: e.target.value })}
            id="imageUrl"
            label="imageUrl"
            variant="outlined"
          />{" "}
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) =>
              setMovieDetails({ ...movieDetails, premiered: e.target.value })
            }
            id="premiered"
            label="premiered"
            variant="outlined"
          />{" "}
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Go back
          </button>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;
