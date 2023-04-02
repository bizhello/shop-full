import { makeStyles } from "@material-ui/core";

const UseStyles = makeStyles((theme) => ({
  mainContent: {
    color: theme.palette.common.white,
    position: "relative",
    padding: theme.spacing(6),
  },
  title: {
    color: "black",
    marginTop: "20px",
  },
}));

export default UseStyles;
