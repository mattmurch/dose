import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

import firebase from "../firebase";

const useStyles = makeStyles({
  formPaper: {
    background: "#ffffff",
    margin: "auto",
    "margin-bottom": "10px",
    width: "50%",
    padding: "10px",
  },
});

const RecentReviews = () => {
  const classes = useStyles();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("alexaReviews")
      .orderBy("timestamp", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        const recentReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (recentReviews.every((obj) => obj.timestamp != null)) {
          // We need to make sure the objects all have timestamp. Firestore uses cache to get fast responses, but we need to hit the server for a timestamp
          setReviews(recentReviews);
        }
      });
  }, []);

  return (
    <Paper className={classes.formPaper}>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id}>
            {review.rating} Star - {review.deviceVariation} - {review.review} (
            {review.timestamp.toDate().toDateString()}{" "}
            {review.timestamp.toDate().toLocaleTimeString("en-US")})
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentReviews;
