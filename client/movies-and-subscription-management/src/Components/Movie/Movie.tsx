import React from "react";
import "./movie.scss";
import Button from "@mui/material/Button";
import { deleteItem, getItemById } from "../../Services/requests";
import EditMovie from "../Edit movie/EditMovie";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/userSlice";

interface IProps {
  movie: {
    _id: string;
    Name: string;
    Genres: [string];
    Image: string;
    Premiered: string;
  };
  getMovies: () => void;
}

const Movie: React.FC<IProps> = ({ movie, getMovies }) => {
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(false);
  const [selectedMovieDetails, setSelectedMovieDetails] = React.useState({});

  const deleteMovie = async () => {
    await deleteItem(`http://localhost:5000/api/movies`, movie._id);
    getMovies();
  };

  const editMovie = async (id: string) => {
    let resp = await getItemById(`http://localhost:5000/api/movies`, id);
    setSelectedMovieDetails(resp.data.movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <div className="user">
        Name:{movie.Name} <br />
        Geners:
        {movie.Genres.map((genre, i) => {
          return <p key={i}>{genre}</p>;
        })}
        premiered:{movie.Premiered}
        <br />
        <img className="image" src={movie.Image} alt="" /> <br />
        <div className="btns">
          <div>
            {user && user.permissions.updateMovie ? (
              <Button variant="outlined" onClick={() => editMovie(movie._id)}>
                Edit
              </Button>
            ) : (
              ""
            )}
            {open && (
              <EditMovie
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                selectedMovieDetails={selectedMovieDetails}
                setSelectedMovieDetails={setSelectedMovieDetails}
              />
            )}
            {user && user.permissions.deleteMovies ? (
              <Button onClick={deleteMovie} variant="outlined">
                Delete
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
