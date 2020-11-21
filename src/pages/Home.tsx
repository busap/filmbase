import React, { FC } from "react";

import TrendingMovies from "../components/TrendingMovies";

type Props = {
  trending: Array<any>;
};

const Home: FC<Props> = ({ trending }) => {
  return (
    <>
      <TrendingMovies trending={trending} />
    </>
  );
};

export default Home;
