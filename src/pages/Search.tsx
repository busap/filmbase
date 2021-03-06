import { CircularProgress, Grid } from "@material-ui/core";
import React, { FC } from "react";
import Thumb from "../components/Thumb";
import { Movie, useLoggedInUser } from "../utils/firebase";

type Props = {
  movies: Movie[];
  searched: Array<any>;
  loading: boolean;
};

const Search: FC<Props> = ({ movies, searched, loading }) => {
  const user = useLoggedInUser();
  
  return (
    <>
      {searched !== [] ? (
        <>
          <h3>Search</h3>
          <Grid container spacing={1} justify="center">
            {loading ? <CircularProgress /> : searched.map((item: any) => {
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
