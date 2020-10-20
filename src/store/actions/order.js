import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const createOrderStart = () => {
  return {
    type: actionTypes.ORDER_BURGER_START,
  };
};

export const checkoutInit = () => {
  return {
    type: actionTypes.CHECKOUT_INIT,
  };
};

export const createOrder = (orderData) => {
  return (dispatch) => {
    dispatch(createOrderStart());

    //axios call to create order
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log("Order api success", response);
        dispatch({
          type: actionTypes.ORDER_BURGER_SUCCESS,
        });
        console.log("Dispatched order success");
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.ORDER_BURGER_FAIL,
        });
      });
  };
};
