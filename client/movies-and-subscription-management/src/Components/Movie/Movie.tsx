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
import SubscriptionsWatched from "../Subscriptions watched/SubscriptionsWatched";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeSharpIcon from "@mui/icons-material/ModeSharp";
interface IProps {
  movie: {
    _id: string;
    Name: string;
    Genres: [string];
    Image: string;
    Premiered: string;
    Subscriptions_watched: [];
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
          className="card-media"
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
            Premiered: {moment(`${movie.Premiered}`).utc().format("DD/MM/YYYY")}
          </Typography>
          <br />
          <SubscriptionsWatched movie={movie} />
        </CardContent>
        <CardActions className="buttons-container">
          {user && user.permissions.updateMovie ? (
            <Button
              onClick={() => editMovie(movie._id)}
              variant="outlined"
              startIcon={<ModeSharpIcon />}
            >
              Edit
            </Button>
          ) : (
            ""
          )}
          {user && user.permissions.deleteMovies ? (
            <Button
              onClick={deleteMovie}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          ) : (
            // <Button size="small" onClick={deleteMovie} variant="outlined">
            //   Delete
            // </Button>
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
