var express = require("express");
var router = express.Router();
const moviesBL = require("../BLs/moviesBL");

router.get("/", async (req, res, next) => {
  let resp = await moviesBL.getMovies();
  res.json(resp);
});
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let resp = await moviesBL.getMovie(id);
  res.json(resp);
});
router.post("/", async (req, res, next) => {
  const { name, imageUrl, premiered, genres } = req.body;
  console.log(name, imageUrl, premiered, genres);
  let resp = await moviesBL.addMovie(name, imageUrl, premiered, genres);
  res.json(resp);
});
router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  let resp = await moviesBL.deleteMovie(id);
  res.json(resp);
});
router.put("/:id", async (req, res, next) => {
  const { _id, Name, Genres, Image, Premiered } = req.body.movie;
  let resp = await moviesBL.editMovie(_id, Name, Genres, Image, Premiered);
  res.send(resp);
});

module.exports = router;
