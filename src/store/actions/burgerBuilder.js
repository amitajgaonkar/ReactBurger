import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";
import * as endPoints from "../../api/apiEndPoints";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFail = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAIL,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(endPoints.FETCH_INGREDIENTS)
      .then((response) => {
        let ingredients = {};
        let resdata = response.data.data;
        resdata.forEach((obj) => {
          // console.log("response", obj.attributes.title);
          let name = obj.attributes.title.toLowerCase();
          ingredients[name] = 0;
        });

        dispatch(setIngredients(ingredients));
      })
      .catch((error) => {
        return dispatch(fetchIngredientsFail());
      });
  };
};
