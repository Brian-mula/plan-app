import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  cardcontent: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-between",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ProjectCards({ project }) {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{project.name[0]}</Avatar>}
          action={
            <IconButton>
              <DeleteOutlinedIcon color="secondary" />
            </IconButton>
          }
          title={project.name}
        />
        <CardMedia
          component="img"
          image={project.photo ? project.photo : "assets/plans.png"}
        />
        <CardContent className={classes.cardcontent}>
          <Typography variant="body2" color="secondary">
            {project.value}
          </Typography>
          <Typography variant="body2" color="error">
            {project.duration}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProjectCards;
