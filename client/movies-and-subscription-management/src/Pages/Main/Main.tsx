import React, { useEffect } from "react";
import Login from "../Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
import Home from "../Home page/Home";
import UserManagement from "../Users Management Page/UserManagement";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Movies from "../../Components/Movies/Movies";
import Users from "../../Components/Users/Users";
import AddMoviePage from "../Add movie page/AddMoviePage";
import SubscriptionPage from "../Subscriptions page/SubscriptionPage";
import Members from "../../Components/Members/Members";
import AddMemberPage from "../Add member/AddMemberPage";
import Unauthorized from "../../Components/Unauthorized/Unauthorized";
import { useSelector } from "react-redux";
import { LOGOUT, selectUser } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import MoviesPage from "../Movies page/MoviesPage";
import "./main.scss";

const Main: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(LOGOUT());
  };

  useEffect(() => {}, []);

  return (
    <>
      {user.isLoggedIn && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                className="nav-link-item"
                onClick={() => navigate("/")}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Home
              </Typography>
              <Typography
                className="nav-link-item"
                onClick={() => navigate("/movies")}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Movies
              </Typography>
              <Typography
                className="nav-link-item"
                onClick={() => navigate("/members")}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Subscriptions
              </Typography>
              {user.userName === "ks1" && (
                <Typography
                  className="nav-link-item"
                  onClick={() => navigate("/manage-users")}
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Users Management
                </Typography>
              )}
              <Button onClick={logout} color="inherit">
                Log Out
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      <Routes>
        <Route path="/" element={user.isLoggedIn ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/manage-users"
          element={user.isLoggedIn ? <UserManagement /> : <Login />}
        >
          <Route path="" element={<Users />} />
          {/* <Route  path="add" element={<AddUser />} /> */}
        </Route>
        <Route path="/movies" element={<MoviesPage />}>
          <Route path="" element={<Movies />} />
          <Route
            path="add"
            element={
              user.isLoggedIn && user.permissions.createMovies ? (
                <AddMoviePage />
              ) : (
                <Unauthorized />
              )
            }
          />
        </Route>
        <Route
          path="/members"
          element={user.isLoggedIn ? <SubscriptionPage /> : <Login />}
        >
          <Route path="" element={<Members />} />
          <Route path="add" element={<AddMemberPage />} />
        </Route>

        {/* Catch all */}
        {/* <Route path="/*" element={<404Component />} /> */}
      </Routes>
    </>
  );
};

export default Main;
