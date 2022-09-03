import React, { useEffect, useState } from "react";
import "./watchList.scss";
import SubscribeMovie from "../Subscribe movie/SubscribeMovie";
import { getItemById } from "../../Services/requests";
import moment from "moment";
import { Button } from "@mui/material";

interface memberProps {
  member: {
    _id: string;
    Name: string;
    Email: string;
    City: string;
    Watched_movies: any;
  };
  getMembers: () => void;
}

const WatchList: React.FC<memberProps> = ({ member }) => {
  const [open, setOpen] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const getWatchedMovies = async () => {
    let memberResp = await getItemById(
      "http://localhost:5000/api/members",
      member._id
    );
    setWatchedMovies(memberResp.data.member.Watched_movies);
  };

  useEffect(() => {
    getWatchedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="watch-list-container">
      <h1 className="header">Movies Watched</h1>
      <div className="watch-list-items">
        {watchedMovies
          ? watchedMovies.map((movie: any) => {
              return (
                <ol key={movie._id}>
                  <a href="/movies">{movie.movieName}</a>
                  <br />
                  <p>
                    {moment(`${movie.watching_date}`)
                      .utc()
                      .format("DD/MM/YYYY")}
                  </p>
                </ol>
              );
            })
          : "No Movies"}
      </div>
      <div className="subscribe-btn">
        <Button variant="contained" onClick={() => setOpen(!open)}>
          Subscribe to a new movie
        </Button>
      </div>
      {open && <SubscribeMovie member={member} />}
    </div>
  );
};

export default WatchList;
