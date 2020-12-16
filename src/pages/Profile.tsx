import React, { FC, useState } from "react";
import { useLoggedInUser, moviesCollection, Movie } from "../utils/firebase";
import { Typography, Grid } from "@material-ui/core";

import Thumb from "../components/Thumb";

const Profile: FC = () => {
  const isLoggedIn = useLoggedInUser();

  const [favMovies, setFavMovies] = useState<Movie[]>([]);
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);

  moviesCollection.onSnapshot(
    (snapshot) => {
      // Access .docs property of snapshot
      setFavMovies(
        snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (movie) => movie.isFavorite && movie.userId === isLoggedIn?.uid
          )
      );
    },
    (err) => console.log(err.message)
  );

  moviesCollection.onSnapshot(
    (snapshot) => {
      // Access .docs property of snapshot
      setSeenMovies(
        snapshot.docs
          .map((doc) => doc.data())
          .filter((movie) => movie.seen && movie.userId === isLoggedIn?.uid)
      );
    },
    (err) => console.log(err.message)
  );

  return (
    <div>
      <h1>Profile</h1>
      {isLoggedIn && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12} direction="row" justify="center">
              <Typography variant="subtitle1">{isLoggedIn.email}</Typography>
            </Grid>
          </Grid>

          <h3>Favorite Movies</h3>
          <Grid container spacing={1} justify="center">
            {favMovies.slice(0, 6).map((movie) => {
              const item = movie.apiItem;

              return <Thumb key={item.id} item={item} movie={movie} />;
            })}
          </Grid>
          <h3>Seen Movies</h3>
          <Grid container spacing={1} justify="center">
            {seenMovies.slice(0, 6).map((movie) => {
              const item = movie.apiItem;

              return <Thumb key={item.id} item={item} movie={movie} />;
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default Profile;
