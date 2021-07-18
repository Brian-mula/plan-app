import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: "400px",
    padding: 20,
    height: "80vh",
    marginLeft: "650px",
  },
  textfield: {
    margin: 18,
  },
  btn: {
    backgroundColor: "#9c27b0",
    margin: 18,
  },
}));
function Create() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // track input values
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");

  // track the input errors
  const [nameError, setNameError] = useState(false);
  const [costError, setCostError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError(false);
    setCostError(false);
    setDurationError(false);

    if (name === "") {
      setNameError(true);
    }
    if (cost === "") {
      setCostError(true);
    }
    if (duration === "") {
      setDurationError(true);
    }

    if (name && cost && duration) {
      const plan = {
        userId: user._id,
        name: name,
        value: cost,
        duration: duration,
      };
      try {
        await axios.post("/create", plan);

        history.push("/projects");
      } catch (error) {}
    }
  };
  return (
    <div>
      <Grid>
        <Paper className={classes.paperStyle} elevation={3}>
          <Grid align="center">
            <Avatar>R</Avatar>
            <h2>{"Create Your Plan " + user.username}</h2>

            <form noValidate onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                className={classes.textfield}
                label="Project Name"
                placeholder="e.g project"
                fullWidth
                variant="outlined"
                error={nameError}
              />
              <TextField
                onChange={(e) => setCost(e.target.value)}
                className={classes.textfield}
                label="Project Value"
                placeholder="e.g 4000"
                fullWidth
                variant="outlined"
                type="number"
                error={costError}
              />
              <TextField
                onChange={(e) => setDuration(e.target.value)}
                className={classes.textfield}
                label="Project Duration"
                placeholder="e.g 30 days"
                fullWidth
                variant="outlined"
                error={durationError}
              />
              <Button className={classes.btn} type="submit" fullWidth>
                Add Plan
              </Button>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default Create;
