const express = require("express");
const moviesBL = require("./BLs/moviesBL");
const membersBL = require("./BLs/membersBL");
const moviesRoute = require("./Routes/movies");
const loginAuth = require("./Routes/loginAuth");
const registerAuth = require("./Routes/registerAuth");
const authCheck = require("./Routes/authCheck");
const usersRoute = require("./Routes/users");
const membersRoute = require("./Routes/members");
const susbcriptionRoute = require("./Routes/susbcription");
const cors = require("cors");

require("./Configs/mongoConfig");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/movies", moviesRoute);
app.use("/api/users", usersRoute);
app.use("/api/members", membersRoute);
app.use("/api/susbcription", susbcriptionRoute);
app.use("/api/auth/login", loginAuth);
app.use("/api/auth/register", registerAuth);
app.use("/api/auth/authCheck", authCheck);

app.get("/", async (req, res) => {
  try {
    // await moviesBL.loadMoviesToDB();
    // await membersBL.loadMembersToDB();
    res.json("hello world");
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/auth/register", async (req, res) => {
  try {
    // let movies = await moviesBL.loadMoviesToDB();
    // let members = await membersBL.loadMembersToDB();
    res.json("hello world");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000);
