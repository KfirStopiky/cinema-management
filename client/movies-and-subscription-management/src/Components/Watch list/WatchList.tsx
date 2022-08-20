import React, { useEffect, useState } from "react";
import "./watchList.scss";
import SubscribeMovie from "../Subscribe movie/SubscribeMovie";
import { getItemById } from "../../Services/requests";
import moment from "moment";

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
  }, [watchedMovies]);

  return (
    <div className="container">
      <h1>Movies Watched</h1>
      {watchedMovies &&
        watchedMovies.map((movie: any) => {
          return (
            <ol key={movie._id}>
              <a href="/">{movie.movieName}</a>
              <br />
              <p>
                {moment(`${movie.watching_date}`).utc().format("DD/MM/YYYY")}
              </p>
            </ol>
          );
        })}

      <button onClick={() => setOpen(!open)}>Subscribe to a new movie</button>
      {open && <SubscribeMovie member={member} />}
    </div>
  );
};

export default WatchList;
