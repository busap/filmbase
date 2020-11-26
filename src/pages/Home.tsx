import React, { FC } from "react";

import Trending from "../components/Trending";
import { Movie } from "../utils/firebase"
type Props = {
  trending: Array<any>;
  movies: Movie[]
};

const Home: FC<Props> = ({ trending, movies }) => {
  return (
    <>
      <Trending trending={trending} movies={movies}/>
    </>
  );
};

export default Home;
