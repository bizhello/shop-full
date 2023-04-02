import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, TextField, ButtonGroup, Button } from "@material-ui/core";

import { popupToggleAction } from "../../store/popupReducer";
import cardService from "../../services/CardService";
import {
  changeModalCardAction,
  clearModalCardAction,
} from "../../store/modalCardReducer";
import { addCardAction } from "../../store/cardReducer";
import { changeCard } from "../../store/asyncActions/cards";
import MultiPicker from "../MultiPicker";
import useStyles from "./style";
import ImageService from "../../services/ImageService";

const MainModal = ({ cardPopup, toggleCardPopup }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileImage, setFileImage] = React.useState(null);
  const modalCard = useSelector((state) => state.modalCard);

  const handleClose = () => {
    toggleCardPopup();
    dispatch(clearModalCardAction());
  };

  const handelSave = async () => {
    const formData = new FormData();
    fileImage && formData.append("image", fileImage, "image");
    if (modalCard.id) {
      const { id, title, price, dateFrom, dateTo, count } = modalCard;
      try {
        dispatch(
          changeCard(id, {
            title,
            price: +price,
            dateFrom,
            dateTo,
            count: +count,
          })
        );
        fileImage && (await ImageService.createImageById(id, formData));
      } catch (error) {
        console.log("ОШИБКА изменения товара");
      }
    } else {
      const card = {
        title: modalCard.title,
        price: +modalCard.price,
        dateFrom: modalCard.dateFrom,
        dateTo: modalCard.dateTo,
        count: +modalCard.count,
      };
      try {
        const newCard = await cardService.createCard(card);
        await ImageService.createImageById(newCard.data.id, formData);
        dispatch(addCardAction(newCard.data));
      } catch (e) {
        console.log("Ошибка добавления товара");
      }
    }

    toggleCardPopup();
    dispatch(clearModalCardAction());
  };

  return (
    <Modal
      open={cardPopup}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <label for="file">Выбрать картинку для товара</label>
            <input
              style={{ marginTop: "10px" }}
              type="file"
              id="file"
              name="file"
              multiple
              onChange={(e) => setFileImage(e.target.files[0])}
            />
          </div>
          <TextField
            id="standard-basic"
            label="Название товара"
            value={modalCard.title}
            onChange={(e) =>
              dispatch(changeModalCardAction({ title: e.target.value }))
            }
          />
          <TextField
            id="standard-basic"
            label="Цена товара"
            value={modalCard.price}
            onChange={(e) =>
              dispatch(changeModalCardAction({ price: e.target.value }))
            }
          />
          <MultiPicker modal={true} />
          <TextField
            id="standard-basic"
            label="Кол-во товара"
            value={modalCard.count}
            onChange={(e) =>
              dispatch(changeModalCardAction({ count: e.target.value }))
            }
          />
          <ButtonGroup
            variant="contained"
            color="primary"
            className={classes.ButtonGroup}
          >
            <Button onClick={() => handelSave()}>Сохранить</Button>
            <Button onClick={() => handleClose()}>Закрыть</Button>
          </ButtonGroup>
        </form>
      </div>
    </Modal>
  );
};

export default MainModal;
