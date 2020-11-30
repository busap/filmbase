import React, { FC, useState } from "react";

import Grid from "@material-ui/core/Grid";

import Thumb from "../components/Thumb";

import { Movie, useLoggedInUser, moviesCollection } from "../utils/firebase"



const Favorites: FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const user = useLoggedInUser();

  moviesCollection.onSnapshot(
    snapshot => {
      // Access .docs property of snapshot
      setMovies(snapshot.docs
        .map(doc => doc.data())
        .filter(movie => movie.isFavorite && movie.userId === user?.uid));
    },
    err => console.log(err.message),
  );

  return (
    <>
      <h3>Favorites</h3>
      <Grid container spacing={1} justify="center">
        {movies.slice(0, 6).map((movie) => {
          
          const item = movie.apiItem
          
          return <Thumb key={item.id} item={item} movie={movie} />
        })}
      </Grid>
    </>
  );
};

export default Favorites;
