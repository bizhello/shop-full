import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  ButtonGroup,
  Typography,
  Tooltip,
  CardMedia,
  IconButton,
  ListItem,
} from "@material-ui/core";
import { Add, Minimize } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import Settings from "@material-ui/icons/Settings";
import { popupToggleAction } from "../../store/popupReducer";
import { changeModalCardAction } from "../../store/modalCardReducer";
import MultiPicker from "../MultiPicker";
import useStyles from "./style";
import ImageService from "../../services/ImageService";
import {
  increment,
  decrement,
  deleteCard,
} from "../../store/asyncActions/cards";

const BeerCard = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dateIsValid = useMemo(() => {
    const difference = Date.parse(data.dateTo) - Date.now();
    return difference < 550383924 ? false : true;
  }, [data.dateTo, data.dateFrom]);

  const changeCard = () => {
    dispatch(
      changeModalCardAction({
        ...data,
      })
    );
    dispatch(popupToggleAction());
  };

  const handelDeleteCard = async () => {
    await ImageService.deleteImageById(data.id);
    dispatch(deleteCard(data.id));
  };

  return (
    <Card className={dateIsValid ? classes.root : classes.error}>
      <CardMedia
        className={classes.media}
        image={`${process.env.REACT_APP_API_URL}/static/images/${data.id}/image.webp`}
        title="Contemplative Reptile"
      />
      <ListItem className={classes.list}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.titleText}
        >
          Название
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.count}
        >
          {data.title}
        </Typography>
      </ListItem>
      <ListItem className={classes.list}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.titleText}
        >
          Цена
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.count}
        >
          {data.price}
        </Typography>
      </ListItem>
      <ListItem className={classes.listDate}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.titleTextDate}
        >
          Срок годности
        </Typography>
        <MultiPicker data={data} modal={false} column={true} />
      </ListItem>
      <Typography
        gutterBottom
        variant="h6"
        component="h6"
        className={classes.count}
      >
        Кол-во {data.count}
      </Typography>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="text"
        size="large"
        className={classes.ButtonGroup}
      >
        <Tooltip title="Plus">
          <IconButton
            aria-label="plus"
            size="medium"
            onClick={() => dispatch(increment(data.id))}
          >
            <Add />
          </IconButton>
        </Tooltip>
        <Tooltip title="Minus">
          <IconButton
            aria-label="minimize"
            size="medium"
            onClick={() => dispatch(decrement(data.id))}
          >
            <Minimize />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="text"
        size="large"
        className={classes.ButtonGroup}
      >
        <Tooltip title="Change">
          <IconButton
            aria-label="change"
            size="medium"
            onClick={() => changeCard()}
          >
            <Settings />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => handelDeleteCard()}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Card>
  );
};

export default BeerCard;
