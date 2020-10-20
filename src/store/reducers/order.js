import * as actionTypes from "../../store/actions/actionTypes";

const initialState = { loading: false, purchased: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECKOUT_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.ORDER_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
      };
    case actionTypes.ORDER_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
