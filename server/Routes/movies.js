var express = require("express");
var router = express.Router();
const moviesBL = require("../BLs/moviesBL");

router.get("/", async (req, res, next) => {
  let resp = await moviesBL.getMovies();
  res.json(resp);
});

module.exports = router;
