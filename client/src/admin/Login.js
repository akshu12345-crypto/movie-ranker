// import './pusher.min.js';
import './login.css';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { adminLogin } from '../adapter/adminAdapter';

// import LoginLeftBar from './LoginLeftbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="right" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://armworldwide.com/">
        PRATAP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme({ palette: { primary: { main: "#e84268" } } });
const SignIn = () => {
  let location = useLocation();
  var navigate = useNavigate();
  const [errorms, setErrorms] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const info = adminLogin({
      email: data.get("email"),
      password: btoa(data.get("password")),
    });
    console.log({
      email: data.get("email"),
      password: btoa(data.get("password")),
    });
    info.then(function (result) {
      if (result.success === true) {
        location.state ? navigate(location.state) : navigate("/dashboard");
      } else {
        // toast.error(result.message);
        setErrorms(result.message);
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="flex-container">
        <div className="login-leftImg">
          <div className="LeftBarImage">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/7/7f/Academy_Award_trophy.png"
              className="mediaLogin-Img"
              alt=""
            />
          </div>
        </div>
        <div className="login-rightform">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <div className="logoDiv">
                <img
                  src="https://thumbs.dreamstime.com/b/best-film-award-icon-simple-style-illustration-vector-web-design-isolated-white-background-155823341.jpg"
                  alt=""
                  className="logoImg"
                />
              </div>
              <div className="LoginDivText">
                <h2 className="LoginHello">Hello</h2>
                <p className="LoginText">Login to manage your account</p>
              </div>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}>
                {/* <ToastContainer /> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  size="small"
                  defaultValue="pratapkhandekar99@gmail.com"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  size="small"
                  defaultValue="easy"
                />
                <p className="errorms">{errorms}</p>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
                <div className="LoginBottom-container">
                  <div className="Signup-div">
                    <NavLink
                      to="/EmailVerification"
                      style={{ color: "rgb(162, 46, 72)" }}>
                      Forgot password?
                    </NavLink>
                    {/* <br />
                      Don't have an account?
                      <Link href="#" variant="body2">
                        {" Sign Up!"}
                      </Link> */}
                  </div>
                  <Copyright />
                </div>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default SignIn;
