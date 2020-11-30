import React, { FC, useState } from "react";
import { useHistory } from 'react-router-dom';

import Grid from "@material-ui/core/Grid";

import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import { Favorite, FavoriteBorder, CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import { useLoggedInUser, moviesCollection, Movie } from '../utils/firebase'
type Props = {
  item: any;
  movie: Movie | undefined
};

const Thumb: FC<Props> = ({ item, movie }) => {
  console.log(movie)
  const [isFavorite, setIsFavorite] = useState<boolean>(movie?.isFavorite ?? false);
  const [seen, setSeen] = useState<boolean>(movie?.seen ?? false)

  const user = useLoggedInUser();
  const { push } = useHistory();


  const favoriteClicked = async () => {
    if (!user) {
      push('/login');
    } else {
      const favorite = !isFavorite

      setIsFavorite(favorite)      

      const movie = await moviesCollection.where('userId', '==', user.uid).where('movieId', '==', item.id).limit(1).get()
      
      if (movie.docs.length === 1) {
        const id = movie.docs[0].id
        moviesCollection.doc(id).update({isFavorite: favorite});
      } else {
      
        const newMovieData = {
          movieId: item.id,
          userId: user.uid,
          isFavorite: favorite,
          seen: false,
          apiItem: item
        };

        await moviesCollection.add(newMovieData)
      }
      } 
    }

    const seenClicked = async () => {
      if (!user) {
        push('/login');
      } else {
        const wasSeen = !seen
  
        setSeen(wasSeen)      
  
        const movie = await moviesCollection.where('userId', '==', user.uid).where('movieId', '==', item.id).limit(1).get()
        
        if (movie.docs.length === 1) {
          const id = movie.docs[0].id
          moviesCollection.doc(id).update({seen: wasSeen});
        } else {
        
          const newMovieData = {
            movieId: item.id,
            userId: user.uid,
            isFavorite: false,
            seen: wasSeen,
            apiItem: item
          };
  
          await moviesCollection.add(newMovieData)
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
        <Fab onClick={seenClicked}>
          {seen && <CheckBox />}
          {!seen && <CheckBoxOutlineBlank />}
        </Fab>
    </Grid>
  );
};

export default Thumb;
