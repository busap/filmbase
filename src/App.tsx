//Import Dependencies
import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
//Import MUI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core";
//Import CSS
import "./App.css";
//Import Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites"
import Seen from "./pages/Seen"
//Import Components
import Nav from "./components/Nav";

//Import Data
import { Movie, moviesCollection } from './utils/firebase'

//MUI Theme
const ourTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#011627",
    },
    secondary: {
      main: "#41EAD4",
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(4, 2),
  },
}));

const App: FC = () => {
  // Styles
  const classes = useStyles();

  // State
  
  const [trending, setTrending] = useState<[]>([]);
  const [firebaseMovies, setFirebaseMovies] = useState<Movie[]>([])
  //Functions
  const getTrending = async (url: string) => {
    const response = await axios.get(url);
    await getFirebaseMovies()
    setTrending(response.data.results);
  };

  const getFirebaseMovies = async() => {
    const moviesSnapshot = await moviesCollection.get();

    setFirebaseMovies(moviesSnapshot.docs.map(doc => doc.data())); 
  }

  //Hooks
  useEffect(() => {
    getTrending(
      "https://api.themoviedb.org/3/trending/all/week?api_key=da0e9e70e92a41b0c9ecb97614df3b6e"
    );
  }, []);

  return (
    <MuiThemeProvider theme={ourTheme}>
      <Router>
        <Nav/>
        <main className="App">
          <Container className={classes.container}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Home trending={trending} movies={firebaseMovies}/>}
              />
              <Route exact path="/favorites" render={() => <Favorites/>}/>
              <Route exact path="/seen" render={() => <Seen/>}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/:type/:id" component={Detail} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </main>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
