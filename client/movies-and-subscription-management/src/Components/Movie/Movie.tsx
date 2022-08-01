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

const Movie: React.FC<IProps> = ({ movie }) => {
  console.log(movie);
  return <div className="container">
    
  </div>;
};

export default Movie;
