const express = require("express");
const moviesBL = require("./BLs/moviesBL");
const membersBL = require("./BLs/membersBL");
const moviesRoute = require("./Routes/movies");

require("./Configs/mongoConfig");

const app = express();

app.use(express.json());
app.use("/api/movies", moviesRoute);

app.get("/", async (req, res) => {
  //   let movies = await moviesBL.loadMoviesToDB();
  //     res.json(movies);
  //   let members = await membersBL.loadMembersToDB();
  res.json("hello world");
});

app.listen(5000);
