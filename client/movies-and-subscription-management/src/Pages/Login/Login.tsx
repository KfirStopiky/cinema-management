import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import TextField from "@mui/material/TextField";
import { login, saveToken } from "../../Services/AuthService";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../Redux/userSlice";
import jwt_decode from "jwt-decode";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = createTheme();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" to={"/"}>
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let resp = await login(userName, password);
    if (resp.data.error === false) {
      let token: string = resp.data.access_token;
      saveToken(token);
      let decodedToken: any = jwt_decode(token);
      if (decodedToken) {
        let userDetails = decodedToken.user;
        dispatch(
          LOGIN({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            sessionTimeOut: userDetails.sessionTimeOut,
            userName: userDetails.userName,
            permissions: userDetails.permissions,
            isLoggedIn: true,
          })
        );
      }
      navigate("/");
    } else {
      alert(resp.data.message);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setUserName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User name"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/"}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to={"/register"}>{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
