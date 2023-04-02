import { CardContent } from "@material-ui/core";
import DatePickers from "../DatePicker";
import useStyles from "./style";

const MultiPicker = ({ data, modal, column }) => {
  const classes = useStyles();

  return (
    <CardContent
      className={classes.date}
      style={{ flexDirection: column && "column" }}
    >
      <DatePickers label={modal ? "NEW_FROM" : "FROM"} data={data} />
      <DatePickers label={modal ? "NEW_TO" : "TO"} data={data} />
    </CardContent>
  );
};

export default MultiPicker;
