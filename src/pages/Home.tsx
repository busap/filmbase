import React, { FC } from "react";

import Trending from "../components/Trending";
import Discover from "../components/Discover";
import { Movie } from "../utils/firebase";

type Props = {
  trending: Array<any>;
  discover: Array<any>;
  movies: Movie[];
};

const Home: FC<Props> = ({ trending, discover, movies }) => {
  return (
    <>
      <Trending trending={trending} movies={movies} />
      <Discover movies={movies} discover={discover} />
    </>
  );
};

export default Home;
