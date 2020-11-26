import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import Thumb from "./Thumb";

import { Movie, useLoggedInUser } from "../utils/firebase"

type Props = {
  trending: Array<any>;
  movies: Movie[]
};

const Trending: FC<Props> = ({ trending, movies }) => {
  //Remove people (left just movie and tv)
  trending.filter((trend) => trend.type !== "person");

  const user = useLoggedInUser();

  return (
    <>
      <h3>Now trending</h3>
      <Grid container spacing={1} justify="center">
        {trending.slice(0, 6).map((item) => {
          const movie = movies.find(movie => movie.movieId === item.id && user?.uid === movie.userId )
          
          return <Thumb key={item.id} item={item} movie={movie} />
        })}
      </Grid>
    </>
  );
};

export default Trending;
