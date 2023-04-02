import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 80,
  },
  list: {
    width: "10%",
    // height: "9em",
    height: "100%",
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "baseline",
  },
  listDate: {
    width: "25%",
    flexDirection: "column",
  },
  titleText: {
    color: "rgba(0, 0, 0, 0.54)",
    marginBottom: "1.5em",
  },
  titleTextDate: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  error: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 80,
    backgroundColor: "rgba(255, 99, 71, 0.6)",
  },
  info: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  media: {
    width: 100,
    height: 140,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  count: {
    textAlign: "center",
    margin: 0,
  },
  ButtonGroup: {},
});

export default useStyles;
