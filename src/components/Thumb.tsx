import React, { FC, useState } from "react";
import { useHistory } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import { useLoggedInUser, favoritesCollection } from '../utils/firebase'
type Props = {
  item: any;
};

const Thumb: FC<Props> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const user = useLoggedInUser();
  const { push } = useHistory();

  const favoriteClicked = async () => {
    if (!user) {
      push('/login');
    } else {
      setIsFavorite(!isFavorite)
      
      if (isFavorite) {
        const data = {
          movieId: "SomeMovie123",
        };
  
        await favoritesCollection.doc(user.uid).set(data);
      } else {
        // await favoriesCollection.doc(user.uid).delete()
      }
      
    }
  }

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
      <Fab onClick={favoriteClicked}>
          {isFavorite && <Favorite />}
          {!isFavorite && <FavoriteBorder />}
        </Fab>
    </Grid>
  );
};

export default Thumb;
