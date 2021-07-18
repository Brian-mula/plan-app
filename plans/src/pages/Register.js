import {
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: "400px",
    padding: 20,
    marginLeft: 650,
    height: "80vh",
    marginTop: 10,
  },
  textStyle: {
    margin: 15,
  },
  avatarStyle: {
    backgroundColor: "#2196f3",
  },
  registerText: {
    margin: 30,
  },
  button: {
    backgroundColor: "#673ab7",
    margin: 20,
  },
}));

function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // catch errors in the inputs
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    setEmailError(false);

    if (username === "") {
      setUsernameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }

    if (username && email && password) {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      try {
        await axios.post("/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Grid container>
        <Paper className={classes.paperStyle}>
          <Grid align="center">
            <Avatar>
              <LockOutlinedIcon
                className={classes.avatarStyle}
                color="primary"
              />
            </Avatar>
            <Typography
              variant="h5"
              color="primary"
              className={classes.registerText}
            >
              Enter Credentials To register
            </Typography>
          </Grid>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              className={classes.textStyle}
              variant="outlined"
              placeholder="e.g Paul"
              label="Username"
              fullWidth
              error={usernameError}
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              className={classes.textStyle}
              variant="outlined"
              placeholder="e.g abc@abc.com"
              label="Email"
              fullWidth
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
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}

export default Register;
