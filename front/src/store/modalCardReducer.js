const enums = {
  CHANGE: "CHANGE",
  CLEAR: "CLEAR",
};
const defaultState = {
  id: null,
  title: "",
  price: null,
  dateFrom: null,
  dateTo: null,
  count: null,
};

const modalCardReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case enums.CHANGE:
      return {
        ...state,
        ...payload,
      };
    case enums.CLEAR:
      return {
        ...state,
        id: null,
        title: "",
        price: null,
        dateFrom: null,
        dateTo: null,
        count: null,
      };
    default:
      return state;
  }
};

export const clearModalCardAction = (payload) => ({
  type: enums.CLEAR,
  payload,
});
export const changeModalCardAction = (payload) => ({
  type: enums.CHANGE,
  payload,
});

export default modalCardReducer;
