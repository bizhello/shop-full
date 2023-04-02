import React from "react";
import { useDispatch } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import { Fab, Typography, Tooltip } from "@material-ui/core";

import MainSelect from "../Select";
import { popupToggleAction } from "../../store/popupReducer";

import useStyles from "./style";

const SelectWithButton = ({ toggleCardPopup }) => {
  const classes = useStyles();
  //   const dispatch = useDispatch();

  //   const handelClick = () => {
  //     toggleCardPopup;
  //   };

  return (
    <div className={classes.block}>
      <MainSelect />
      <div className={classes.block}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.text}
        >
          Добавить товар
        </Typography>
        <Tooltip title="Add" aria-label="add">
          <Fab
            color="secondary"
            className={classes.absolute}
            onClick={() => toggleCardPopup()}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default SelectWithButton;
