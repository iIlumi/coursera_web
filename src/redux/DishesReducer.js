// import { DISHES } from '../shared/dishes';
import * as ActionTypes from './ActionTypes';

// Định nghĩa initial state ngay bên trong luôn
export const DishesReducer = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };

    // ko set lại dishes khi failed
    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };

    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };

    default:
      return state;
  }
};
