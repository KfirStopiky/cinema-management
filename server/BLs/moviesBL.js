const moviesDAL = require("../DALs/moviesDAL");
const movieSchema = require("../Models/movieModel");

const loadMoviesToDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
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
    } catch (error) {
      reject(error);
    }
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

const getMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await movieSchema.findById(id);
      resolve({ error: false, movie });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const addMovie = (Name, Image, Premiered, Genres) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newMovie = await new movieSchema({
        Name,
        Image,
        Premiered,
        Genres,
      }).save();
      return resolve({ error: false, newMovie });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const deleteMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let resp = await movieSchema.findByIdAndDelete(id);
      resolve({
        error: false,
        message: "Movie has been deleted successfully!",
      });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

const editMovie = (_id, Name, Genres, Image, Premiered) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await movieSchema.findByIdAndUpdate(
        _id,
        {
          $set: {
            Name,
            Genres,
            Image,
            Premiered,
          },
        },
        { new: true }
      );
      resolve({
        error: false,
        message: "Movie has been edited successfully!",
        movie,
      });
    } catch (err) {
      reject({ error: true, message: err });
    }
  });
};

module.exports = {
  loadMoviesToDB,
  getMovies,
  deleteMovie,
  editMovie,
  getMovie,
  addMovie,
};
