import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "100%",
  },

  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
}));

function Layout({ children }) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      {/* appbar */}

      {/* end of appbar */}

      {/* sidebar */}
      {user && <Navbar />}
      {/* end of side bar */}
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
