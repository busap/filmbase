import React, { FC } from "react";

import Trending from "../components/Trending";

type Props = {
  trending: Array<any>;
};

const Home: FC<Props> = ({ trending }) => {
  return (
    <>
      <Trending trending={trending} />
    </>
  );
};

export default Home;
