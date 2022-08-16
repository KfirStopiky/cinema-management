import React from "react";
import "./movie.scss";
import Button from "@mui/material/Button";
import { deleteItem, getItemById } from "../../Services/requests";
import EditMovie from "../Edit movie/EditMovie";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/userSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

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
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={movie.Image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genres: {movie.Genres}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            Premiered: {movie.Premiered}
          </Typography>
        </CardContent>
        <CardActions>
          {user && user.permissions.updateMovie ? (
            <Button
              size="small"
              variant="outlined"
              onClick={() => editMovie(movie._id)}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
          {user && user.permissions.deleteMovies ? (
            <Button size="small" onClick={deleteMovie} variant="outlined">
              Delete
            </Button>
          ) : (
            ""
          )}
        </CardActions>
        {open && (
          <EditMovie
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            selectedMovieDetails={selectedMovieDetails}
            setSelectedMovieDetails={setSelectedMovieDetails}
          />
        )}
      </Card>
    </div>
  );
};

export default Movie;
