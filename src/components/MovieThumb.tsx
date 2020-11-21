import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

type Props = {
  movie: any;
};

const MovieThumb: FC<Props> = ({ movie }) => {
  console.log(movie);

  return (
    <Grid item xs={4} md={2} className="thumb">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="img-thumb"
      />
      <h5>{movie.title ? movie.title : movie.name}</h5>
    </Grid>
  );
};

export default MovieThumb;
