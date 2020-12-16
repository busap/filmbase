import React, { FC, Dispatch, SetStateAction } from "react";
import { Link, useHistory } from "react-router-dom";

import { Button } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import { useLoggedInUser, signOut } from "../utils/firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "block",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      margin: theme.spacing(0, 2),
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    btn: {
      color: "#41EAD4",
    },
    fab: {
      backgroundColor: "#41EAD4",
      transform: "scale(0.9)",
      "&:hover": {
        backgroundColor: "#011627",
        border: "1px solid #41EAD4",
        color: "#41EAD4",
      },
    },
  })
);

type Props = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const Nav: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const classes = useStyles();

  const user = useLoggedInUser();

  const history = useHistory();

  const handleChangeSearch = (e: any) => {
    if (history.location.pathname !== '/search') {
      history.push('/search')
    } 
    setSearchQuery(e.target.value)
  }

  return (
    <nav className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} noWrap>
            <Link to="/">
              <Button className={classes.btn}>Home</Button>
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchQuery}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleChangeSearch(e)}
            />
          </div>
          {user ? (
            <>
              <Link to="/profile">
                <Fab className={classes.fab}>PB</Fab>
              </Link>
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={async () => {
                  try {
                    await signOut();
                  } catch (err) {
                    alert(err.message);
                  }
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className={classes.btn}>Log In</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Nav;
