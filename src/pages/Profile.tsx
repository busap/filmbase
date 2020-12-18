import React, { FC, useState, useEffect } from "react";
import { useLoggedInUser, moviesCollection, Movie } from "../utils/firebase";
import { Typography, Grid } from "@material-ui/core";

import Thumb from "../components/Thumb";

const Profile: FC = () => {
  const isLoggedIn = useLoggedInUser();

  const [favMovies, setFavMovies] = useState<Movie[]>([]);
  const [seenMovies, setSeenMovies] = useState<Movie[]>([]);
  const [renderer, setRenderer] = useState<boolean>(false);

  useEffect(() => {
    moviesCollection
      .get()
      .then((response) => {
        setFavMovies( 
          response.docs
            .map((doc) => doc.data())
            .filter(
              (movie) => movie.isFavorite && movie.userId === isLoggedIn?.uid
            )
        );
        setSeenMovies(
          response.docs
            .map((doc) => doc.data())
            .filter((movie) => movie.seen && movie.userId === isLoggedIn?.uid)
        );
        setRenderer(true);
      })
      .catch(err => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = moviesCollection.onSnapshot(
      (snapshot) => {
        
      // Access .docs property of snapshot
        setFavMovies( 
          snapshot.docs
            .map((doc) => doc.data())
            .filter(
              (movie) => movie.isFavorite && movie.userId === isLoggedIn?.uid
            )
        );
        setSeenMovies(
          snapshot.docs
            .map((doc) => doc.data())
            .filter((movie) => movie.seen && movie.userId === isLoggedIn?.uid)
        );
      },

        (err) => console.log(err.message)
      );
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderer])

  return (
    <div>
      <h1>Profile</h1>
      {isLoggedIn && (
        <>
          <Grid container spacing={1} direction="row" justify="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1">{isLoggedIn.email}</Typography>
            </Grid>
          </Grid>

          <h3>Favorite Movies</h3>
          <Grid container spacing={1} justify="center">
            {favMovies.map((movie) => {
              const item = movie.apiItem;

              return <Thumb key={item.id} item={item} movie={movie} />;
            })}
          </Grid>
          <h3>Seen Movies</h3>
          <Grid container spacing={1} justify="center">
            {seenMovies.map((movie) => {
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
