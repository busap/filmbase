import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import Thumb from "./Thumb";

import { Movie, useLoggedInUser } from "../utils/firebase";
import { Box, CircularProgress } from "@material-ui/core";

type Props = {
  discover: Array<any>;
  movies: Movie[];
  loading: boolean;
};

const Discover: FC<Props> = ({ discover, movies, loading }) => {
  const user = useLoggedInUser();

  return (
    <>
      <h3>Discover recent releases</h3>
      <Grid container spacing={1} justify="center">
        {loading ? <CircularProgress /> : discover.slice(0, 6).map((item) => {
          const movie = movies.find(
            (movie) => movie.movieId === item.id && user?.uid === movie.userId
          );

          return <Thumb key={item.id} item={item} movie={movie} />;
        })}
      </Grid>
      <Box height={15} />
    </>
  );
};

export default Discover;
