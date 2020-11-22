import React, { FC } from "react";

import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";

type Props = {
  item: any;
};

const Thumb: FC<Props> = ({ item }) => {
  return (
    <Grid item xs={4} md={2} className="thumb">
      <Link
        to={{
          pathname: `/:${item.media_type}/:${item.id}`,
          state: { item: item },
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title ? item.title : item.name}
          className="img-thumb"
        />
        <h5>{item.title ? item.title : item.name}</h5>
      </Link>
    </Grid>
  );
};

export default Thumb;
