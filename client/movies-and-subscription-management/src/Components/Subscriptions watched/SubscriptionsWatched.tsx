import React from "react";
import "./subscriptionsWatched.scss";
import moment from "moment";

interface IProps {
  movie: {
    _id: string;
    Name: string;
    Genres: [string];
    Image: string;
    Premiered: string;
    Subscriptions_watched: any;
  };
}

const SubscriptionsWatched: React.FC<IProps> = ({ movie }) => {
  return (
    <div className="container">
      <h1>Subscriptions watched</h1>

      {movie.Subscriptions_watched && movie.Subscriptions_watched.length > 0
        ? movie.Subscriptions_watched.map((s: any, i: number) => {
            return (
              <ul key={i}>
                <li>
                  {s.memberName},
                  {moment(`${s.date}`).utc().format("DD/MM/YYYY")}
                </li>
              </ul>
            );
          })
        : "No Subscriptions for this movie :("}
    </div>
  );
};

export default SubscriptionsWatched;
