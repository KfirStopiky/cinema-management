import React, { useEffect } from "react";
import Login from "../Login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register";
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
import { Container } from "@mui/system";
import AdbIcon from "@mui/icons-material/Adb";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const pages = ["Movies", "Subscriptions", "Users-Management"];

const Main: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (tabName: string) => {
    console.log("handleCloseNavMenu");
    navigate(tabName);

    setAnchorElNav(null);
  };

  const logout = () => {
    console.log("logout");
    dispatch(LOGOUT());
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="navbar">
        {user.isLoggedIn && (
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  className="logo"
                  onClick={() => navigate("/movies")}
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  HOME
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={() => handleCloseNavMenu(page)}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                  className="logo"
                  variant="h5"
                  noWrap
                  component="a"
                  onClick={() => navigate("/movies")}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  HOME
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                <LogoutIcon onClick={() => logout()} />
              </Toolbar>
            </Container>
          </AppBar>
        )}
      </div>

      <Routes>
        <Route path="/register" element={<Register />} />

        <Route
          path="/Users-Management"
          element={user.isLoggedIn ? <UserManagement /> : <Login />}
        >
          <Route path="" element={<Users />} />
        </Route>
        <Route
          path="/movies"
          element={user.isLoggedIn ? <MoviesPage /> : <Login />}
        >
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
          path="/Subscriptions"
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
