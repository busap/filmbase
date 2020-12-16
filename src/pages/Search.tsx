import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import Thumb from "../components/Thumb";
import { Movie, useLoggedInUser } from "../utils/firebase";

type Props = {
  movies: Movie[];
  searched: Array<any>;
};

const Search: FC<Props> = ({ movies, searched }) => {
  const user = useLoggedInUser();

  return (
    <>
      {searched !== [] ? (
        <>
          <h3>Search</h3>
          <Grid container spacing={1} justify="center">
            {searched.map((item: any) => {
              const movie = movies.find(
                (movie) =>
                  movie.movieId === item.id && user?.uid === movie.userId
              );
              return <Thumb key={item.id} item={item} movie={movie} />;
            })}
          </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
