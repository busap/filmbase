import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {
  Today,
  Translate,
  MovieFilter,
  PeopleAlt,
  Timer,
  NotificationsNone,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    item: {
      padding: theme.spacing(1),
    },
    img: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-end",
      },
    },
    infoBox: {
      padding: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.up("md")]: {
        justifyContent: "flex-start",
      },
    },
    info: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    color: {
      color: "var(--color-secondary)",
      border: "1px solid var(--color-secondary)",
      borderRadius: "10px",
      padding: "5px",
    },
  })
);

const Detail: FC = () => {
  //Styles
  const classes = useStyles();

  //State
  const [detail, setDetail] = useState<any>({});

  //Functions
  const getDetail = async (url: string) => {
    const response = await axios.get(url);
    setDetail(response.data);
  };

  //Hooks
  let params: { type: string; id: string } = useParams();
  let type = params.type.replace(":", "");
  let id = params.id.replace(":", "");

  useEffect(() => {
    const movieType = (type === undefined) ? type : "movie";
    getDetail(
      `https://api.themoviedb.org/3/${movieType}/${id}?api_key=da0e9e70e92a41b0c9ecb97614df3b6e`
    );
  }, []);

  console.log(detail);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            {detail.title ? detail.title : detail.name}
          </Typography>
          <Typography variant="subtitle1">
            {detail.original_name !== detail.title &&
            detail.original_name !== detail.name
              ? "(" + detail.original_name + ")"
              : ""}
          </Typography>
        </Grid>
        <Grid container xs={12} md={6} className={classes.img}>
          <img
            className={classes.item}
            src={
              detail.poster_path
                ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
                : `https://via.placeholder.com/300`
            }
            alt={detail.title ? detail.title : detail.name}
            height="300px"
          />
        </Grid>
        <Grid
          container
          xs={12}
          md={6}
          alignContent="center"
          spacing={1}
          className={classes.infoBox}
        >
          <Grid item xs={12}>
            {type === "tv" ? (
              <>
                {detail.first_air_date !== undefined ? (
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.info}
                  >
                    <Grid item className={classes.color}>
                      <Today />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" className={classes.item}>
                        {detail.first_air_date.substring(0, 4)}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {detail.release_date !== undefined ? (
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.info}
                  >
                    <Grid item className={classes.color}>
                      <Today />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" className={classes.item}>
                        {detail.release_date.substring(0, 4)}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {detail.languages !== undefined ? (
              <Grid container alignItems="center" className={classes.info}>
                <Grid item className={classes.color}>
                  <Translate />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.item}>
                    {Array.from(detail.languages).map((item: any) =>
                      item === detail.languages[detail.languages.length - 1] ? (
                        <em>{item}</em>
                      ) : (
                        <em>{item + " / "}</em>
                      )
                    )}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Grid container alignItems="center" className={classes.info}>
                <Grid item className={classes.color}>
                  <Translate />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.item}>
                    <em>{detail.original_language}</em>
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            {detail.genres !== undefined ? (
              <Grid container alignItems="center" className={classes.info}>
                {" "}
                <Grid item className={classes.color}>
                  <MovieFilter />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.item}>
                    {Array.from(detail.genres).map((item: any) =>
                      item === detail.genres[detail.genres.length - 1] ? (
                        <em>{item.name}</em>
                      ) : (
                        <em>{item.name + " / "}</em>
                      )
                    )}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={12}>
            {detail.created_by !== undefined ? (
              <Grid container alignItems="center" className={classes.info}>
                <Grid item className={classes.color}>
                  <PeopleAlt />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.item}>
                    {Array.from(detail.created_by).map((item: any) =>
                      item ===
                      detail.created_by[detail.created_by.length - 1] ? (
                        <strong>{item.name}</strong>
                      ) : (
                        <em>{item.name + " / "}</em>
                      )
                    )}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
          {type === "tv" ? (
            <Grid item xs={12} className={classes.item}>
              <Grid container alignItems="center" className={classes.info}>
                <Typography variant="body1" className={classes.item}>
                  Seasons: {detail.number_of_seasons} / Episodes:{" "}
                  {detail.number_of_episodes}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.item}>
              <Grid container alignItems="center" className={classes.info}>
                <Grid item className={classes.color}>
                  <Timer />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className={classes.item}>
                    {detail.runtime} min
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} className={classes.item}>
            <Grid container alignItems="center" className={classes.info}>
              <Grid item className={classes.color}>
                <NotificationsNone />
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.item}>
                  {detail.status}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" className={classes.item}>
          <Grid item xs={8}>
            <Box textAlign="center">
              <Typography variant="overline">{detail.tagline}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" className={classes.item}>
          <Grid item xs={8}>
            <Box textAlign="center">
              <Typography variant="body1">
                {" "}
                <p>{detail.overview}</p>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detail;
