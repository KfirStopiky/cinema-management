const express = require("express");
const moviesBL = require("./BLs/moviesBL");
const membersBL = require("./BLs/membersBL");
const moviesRoute = require("./Routes/movies");

require("./Configs/mongoConfig");

const app = express();

app.use(express.json());
app.use("/api/movies", moviesRoute);

app.get("/", async (req, res) => {
  try {
    // let movies = await moviesBL.loadMoviesToDB();
    // let members = await membersBL.loadMembersToDB();
    res.json("hello world");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000);
