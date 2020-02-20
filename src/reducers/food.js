import {createReducer} from '../helpers/createReducer';
import {FOOD_MOVE} from '../actions';

const initialState = {
  x: 20,
  y: 20
};

export const food = createReducer(initialState, {
  [FOOD_MOVE](state, action) {
    return {x: action.x, y: action.y};
  }
});