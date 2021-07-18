import {
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { LoginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: "400px",
    padding: 20,
    margin: "15px auto",
    height: "75vh",
  },
  textStyle: {
    margin: 20,
  },
  avatarStyle: {
    background: "#2196f3",
  },
  loginText: {
    margin: 30,
  },
  button: {
    backgroundColor: "#673ab7",
    margin: 20,
  },
}));

function Login() {
  const classes = useStyles();
  const { isFetching, dispatch } = useContext(AuthContext);

  // get input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // input errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (email && password) {
      LoginCall({ email, password }, dispatch);
    }
  };
  return (
    <div>
      <Container>
        <Grid container>
          <Paper className={classes.paperStyle}>
            <Grid align="center">
              <Avatar>
                <LockOutlinedIcon className={classes.avatarStyle} />
              </Avatar>
              <Typography
                variant="h5"
                color="primary"
                className={classes.loginText}
              >
                Enter Credentials To Login
              </Typography>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                className={classes.textStyle}
                variant="outlined"
                placeholder="e.g abc@abc.com"
                label="Email"
                fullWidth
                type="email"
                error={emailError}
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                className={classes.textStyle}
                variant="outlined"
                placeholder="e.g 123456"
                label="Password"
                fullWidth
                type="password"
                error={passwordError}
              />
              <Button type="submit" fullWidth className={classes.button}>
                {" "}
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}

export default Login;
