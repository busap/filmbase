import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import MovieThumb from "../components/MovieThumb";

type Props = {
  trending: Array<any>;
};

const TrendingMovies: FC<Props> = ({ trending }) => {
  return (
    <>
      <h3>Now trending</h3>
      <Grid container spacing={1} justify="center">
        {trending.slice(0, 6).map((movie) => (
          <MovieThumb key={movie.id} movie={movie} />
        ))}
      </Grid>
    </>
  );
};

export default TrendingMovies;
