import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import SurveyForm from "./components/SurveyForm";
import RecentReviews from "./components/RecentReviews";
import logo from "./logo.svg";
import firebase from "./firebase";
import "./App.css";

const useStyles = makeStyles({
  root: {
    background: "#363636",
    color: "white",
    height: "100vh",
    padding: "0px",
    margin: "0px",
  },
  header: {
    margin: "0px",
    padding: "10px",
    "text-align": "center",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Please Review Your Alexa Device:</h1>
      <SurveyForm />
      <h3 className={classes.header}>Recent Reviews:</h3>
      <RecentReviews />
    </div>
  );
};

export default App;
