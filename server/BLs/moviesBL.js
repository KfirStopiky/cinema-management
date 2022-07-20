const moviesDAL = require("../DALs/moviesDAL");
const movieSchema = require("../Models/movieModel");

const loadMoviesToDB = () => {
  return new Promise(async (resolve, reject) => {
    // Get all movies from WS
    let allMoviesData = await moviesDAL.getMovies();
    let movies = allMoviesData.data;
    let moviesShorstArr = movies.splice(1, 2);

    console.log(moviesShorstArr[0].genres);

    // Insert movies to DB
    moviesShorstArr.forEach((m) => {
      let movieObj = movieSchema({
        Id: m.id,
        Name: m.name,
        Genres: m.genres,
        Image: m.image.original,
        Premiered: m.premiered,
      });
      movieObj.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("succsess");
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
