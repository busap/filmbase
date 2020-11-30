import React, { FC } from "react";

import Trending from "../components/Trending";
import { Movie } from "../utils/firebase"
type Props = {
  trending: Array<any>;
  discover: Array<any>;
  movies: Movie[]
};

const Home: FC<Props> = ({ trending, discover, movies }) => {
  return (
    <>
      <Trending trending={trending} movies={movies} discover={discover}/>
    </>
  );
};

export default Home;
