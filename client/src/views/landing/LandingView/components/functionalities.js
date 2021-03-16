import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "./ImageCard";
import reciFun from "../static/funcSpec";
import useWindowPosition from "../hook/useWindowPosition";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'green',
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

export default function () {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="site-functionality">
      <ImageCard
        place={reciFun[1]}
        image="src/views/landing/LandingView/assets/search.png"
        checked={checked}
      />
      <ImageCard place={reciFun[0]} src={reciFun[0].src} checked={checked} />
    </div>
  );
}
