const moviesDAL = require("../DALs/moviesDAL");
const movieSchema = require("../Models/movieModel");

const loadMoviesToDB = () => {
  return new Promise(async (resolve, reject) => {
    // Get all movies from WS
    let allMoviesData = await moviesDAL.getMovies();
    let movies = allMoviesData.data;

    movies.map((movie) => {
      let movieObj = movieSchema({
        Id: movie.id,
        Name: movie.name,
        Genres: movie.genres,
        Image: movie.image.original,
        Premiered: movie.premiered,
      });
      movieObj.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(movieObj);
        }
      });
    });
  });
};

const getMovies = () => {
  return new Promise((resolve, reject) => {
    movieSchema.find({}, (err, movies) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(movies);
      }
    });
  });
};

module.exports = { loadMoviesToDB, getMovies };
