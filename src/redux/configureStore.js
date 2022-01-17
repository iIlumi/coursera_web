// import { Reducer, initialState } from './reducer';
import { createStore, combineReducers } from 'redux';
import { DishesReducer } from './DishesReducer';
import { CommentsReducer } from './CommentsReducer';
import { PromotionsReducer } from './PromotionsReducer';
import { LeadersReducer } from './LeadersReducer';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: DishesReducer,
      comments: CommentsReducer,
      promotions: PromotionsReducer,
      leaders: LeadersReducer,
    })
  );

  return store;
};
