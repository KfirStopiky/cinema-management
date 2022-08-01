import React from "react";
import "./movie.scss";

interface IProps {
  movie: {
    _id: string;
    name: string;
    genres: [string];
    image: string;
    premiered: string;
  };
}

const Movie: React.FC<IProps> = () => {
  return <div>Movie</div>;
};

export default Movie;
