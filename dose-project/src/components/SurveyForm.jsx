import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

import firebase from "../firebase";

const deviceVariations = [
  "Charcoal Fabric",
  "Sandstone Fabric",
  "Black",
  "White",
  "Walnut Finish",
  "Heather Gray Fabric",
  "Oak Finish",
];

const useStyles = makeStyles({
  formPaper: {
    background: "#ffffff",
    margin: "auto",
    "margin-bottom": "10px",
    width: "50%",
    padding: "10px",
  },
});

const SurveyForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    rating: "",
    deviceVariation: "",
    review: "",
    timestamp: undefined,
  });

  const [error, setError] = useState("");

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const validate = () => {
    // Check rating
    if (formData.rating === "") {
      return "You Must Give The Device A Rating";
    }
    // Check deviceVariation
    else if (formData.deviceVariation === "") {
      return "You Must Select A Device Variation";
    }
    // Check review
    else if (formData.review === "") {
      return "You Must Write A Review";
    } else if (!formData.review.match(/^[A-Za-z0-9 _.,!"'/$]+$/)) {
      return "The Review Can Only Contain Numbers, Letters, and Punctuation";
    } else {
      return "true";
    }
  };

  const handleSubmit = () => {
    let validation = validate();
    if (validation === "true") {
      firebase.firestore().collection("alexaReviews").add({
        rating: formData.rating,
        deviceVariation: formData.deviceVariation,
        review: formData.review,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // Reset the form
      setFormData({
        rating: "",
        deviceVariation: "",
        review: "",
        timestamp: undefined,
      });
      // Reset Error
      setError("");
    } else {
      console.log(validation);
      setError(validation);
    }
  };

  return (
    <Paper className={classes.formPaper}>
      {error ? <Alert severity="error">{error}</Alert> : ""}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography>Rating:</Typography>
        </Grid>
        <Grid item>
          <Rating
            name="simple-controlled"
            value={formData.rating}
            onChange={handleChange("rating")}
          />
        </Grid>
        <Grid item>
          <Typography>Device Variation:</Typography>
        </Grid>
        <Grid item>
          <Select
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            label="deviceVariation"
            value={formData.deviceVariation}
            onChange={handleChange("deviceVariation")}
          >
            {deviceVariations.map((device) => (
              <MenuItem key={device} value={device}>
                {device}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Typography>Review:</Typography>
        </Grid>
        <Grid item>
          <TextField
            multiline
            rows={4}
            variant="filled"
            value={formData.review}
            onChange={handleChange("review")}
          ></TextField>
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SurveyForm;
