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
router.delete("/", async (req, res, next) => {
  const { id } = req.body;
  let resp = await moviesBL.deleteMovie(id);
  res.json(resp);
});
router.put("/:id", async (req, res, next) => {
  const { _id, Name, Genres, Image, Premiered } = req.body.user;
  console.log(_id, Name, Genres, Image, Premiered);
  let resp = await usersBL.editUser(_id, Name, Genres, Image, Premiered);
  res.send(resp);
});

module.exports = router;
