// import { Reducer, initialState } from './reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { DishesReducer } from './DishesReducer';
import { CommentsReducer } from './CommentsReducer';
import { PromotionsReducer } from './PromotionsReducer';
import { LeadersReducer } from './LeadersReducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

// https://github.com/reduxjs/redux-thunk#manual-setup
// https://github.com/LogRocket/redux-logger#usage

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: DishesReducer,
      comments: CommentsReducer,
      promotions: PromotionsReducer,
      leaders: LeadersReducer,
    }),
    // Store enhancer
    applyMiddleware(thunk, logger)
  );

  return store;
};
