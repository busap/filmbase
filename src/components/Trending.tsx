import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import Thumb from "./Thumb";

type Props = {
  trending: Array<any>;
};

const Trending: FC<Props> = ({ trending }) => {
  //Remove people (left just movie and tv)
  trending.filter((trend) => trend.type !== "person");

  return (
    <>
      <h3>Now trending</h3>
      <Grid container spacing={1} justify="center">
        {trending.slice(0, 6).map((item) => (
          <Thumb key={item.id} item={item} />
        ))}
      </Grid>
    </>
  );
};

export default Trending;
