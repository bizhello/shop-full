import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container, makeStyles, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import SelectWithButton from "../../SelectWithButton";
import MainModal from "../../Modal";
import BeerCard from "../../BeerCard";
import HeaderIsAuth from "../../Header/HeaderIsAuth";
import { fetchCards } from "../../../store/asyncActions/cards";
import UseStyles from "./style";

const Main = () => {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.popup);
  const cards = useSelector((state) => state.card.cards);
  const [searchQuarry, setSearchQuarry] = React.useState("");
  const [cardPopup, setCardPopup] = React.useState(false);

  const toggleCardPopup = () => {
    setCardPopup((prev) => !prev);
  };

  const getCards = React.useCallback(() => {
    try {
      dispatch(fetchCards());
    } catch (error) {
      console.log("Ошибка загрузки  карточек");
    }
  }, [dispatch]);

  React.useEffect(() => {
    getCards();
  }, [getCards]);

  const sortedCards = React.useMemo(() => {
    if (searchQuarry) {
      return cards?.filter((item) =>
        item.title.toLowerCase().includes(searchQuarry.toLowerCase())
      );
    }

    return cards;
  }, [searchQuarry, cards]);

  return (
    <>
      <HeaderIsAuth />
      <Container className={classes.mainContent}>
        <TextField
          id="main_input"
          label="Название"
          className={classes.mainInput}
          placeholder="Введите название для поиска ..."
          // helperText="Full width!"
          value={searchQuarry}
          onChange={(e) => setSearchQuarry(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <SelectWithButton toggleCardPopup={toggleCardPopup} />
        {sortedCards.length !== 0 ? (
          sortedCards.map((item) => (
            <BeerCard
              key={item.id}
              data={item}
              toggleCardPopup={toggleCardPopup}
            />
          ))
        ) : (
          <Typography variant="h4" className={classes.title}>
            Товар не найден!
          </Typography>
        )}
      </Container>
      {cardPopup && (
        <MainModal cardPopup={cardPopup} toggleCardPopup={toggleCardPopup} />
      )}
    </>
  );
};

export default Main;
