import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { addItem } from "../../Services/requests";
import "./addMoviePage.scss";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";

const AddMoviePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = createTheme();

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

  const handleSubmit = async (e: any, movieDetails: any) => {
    e.preventDefault();
    let resp = await addItem("http://localhost:5000/api/movies", movieDetails);
    if (resp.data.error === false) {
      navigate("/movies");
    } else {
      alert(resp.data.message);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add new movie
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setMovieDetails({ ...movieDetails, name: e.target.value })}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
              />
              <TextField
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setMovieDetails({ ...movieDetails, genres: e.target.value })
                }
                margin="normal"
                required
                fullWidth
                name="genres"
                label="Genres"
                type="text"
                id="genres"
              />
              <TextField
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setMovieDetails({ ...movieDetails, imageUrl: e.target.value })
                }
                margin="normal"
                required
                fullWidth
                name="imageUrl"
                label="Image url"
                type="text"
                id="imageUrl"
              />
              <TextField
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) =>
                  setMovieDetails({
                    ...movieDetails,
                    premiered: e.target.value,
                  })
                }
                margin="normal"
                required
                fullWidth
                name="premiered"
                label="Premiered"
                type="date"
                id="premiered"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Back
              </Button>
              <Button
                onClick={(e) => {
                  handleSubmit(e, movieDetails);
                }}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddMoviePage;
