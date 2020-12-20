import React, { FC } from "react";

import Trending from "../components/Trending";
import Discover from "../components/Discover";
import { Movie } from "../utils/firebase";

type Props = {
  trending: Array<any>;
  discover: Array<any>;
  movies: Movie[];
  getMovies: () => Promise<void>;
  loadingTrending: boolean;
  loadingDiscover: boolean;
};

const Home: FC<Props> = ({ trending, discover, movies, loadingTrending, loadingDiscover }) => {

  return (
    <>
      <Trending trending={trending} movies={movies} loading={loadingTrending}/>
      <Discover movies={movies} discover={discover} loading={loadingDiscover}/>
    </>
  );
};

export default Home;
