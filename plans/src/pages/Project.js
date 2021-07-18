import { Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import projects from "../components/Dummydata";
import ProjectCards from "../components/ProjectCards";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  head2: {
    margin: "20px auto",
  },
}));

function Project() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await axios.get("/projects/" + user._id);
        setProjects(plans.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchPlans();
  }, [user._id]);

  return (
    <Container>
      <div>
        <h2 className={classes.head2}>
          {"Here are your plans  " + user.username}
        </h2>
        <Grid container spacing={2}>
          {projects &&
            projects.map((project) => (
              <Grid item key={project.id} xs={12} md={3}>
                <Paper>
                  <ProjectCards project={project} />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    </Container>
  );
}

export default Project;
