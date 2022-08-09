import React, { useEffect } from "react";
import Login from "../Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../Home page/Home";
import UserManagement from "../Users Management Page/UserManagement";
import { getToken } from "../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Movies from "../../Components/Movies/Movies";
import Users from "../../Components/Users/Users";
import MoviesPage from "../Movies page/MoviesPage";
import AddMoviePage from "../Add movie page/AddMoviePage";
import EditUserPage from "../Edit user page/EditUserPage";
import SubscriptionPage from "../Subscriptions page/SubscriptionPage";
import Members from "../../Components/Members/Members";
import AddMemberPage from "../Add member/AddMemberPage";

const Main: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let token = getToken();
    if (token === null) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Home
            </Typography>
            <Typography
              onClick={() => navigate("/movies")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Movies
            </Typography>
            <Typography
              onClick={() => navigate("/members")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Subscriptions
            </Typography>
            <Typography
              onClick={() => navigate("/manage-users")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Users Management
            </Typography>
            <Button
              onClick={() => {
                localStorage.clear();
              }}
              color="inherit"
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route
          path="/"
          element={localStorage.getItem("token") ? <Home /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-users" element={<UserManagement />}>
          <Route path="" element={<Users />} />
          {/* <Route  path="add" element={<AddUser />} /> */}
        </Route>
        <Route path="/manage-users/:id" element={<EditUserPage />} />
        <Route path="/movies" element={<MoviesPage />}>
          <Route path="" element={<Movies />} />
          <Route path="add" element={<AddMoviePage />} />
        </Route>
        <Route path="/members" element={<SubscriptionPage />}>
          <Route path="" element={<Members />} />
          <Route path="add" element={<AddMemberPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Main;
