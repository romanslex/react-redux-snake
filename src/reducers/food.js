import {createReducer} from '../helpers/createReducer';
import {FOOD_EATEN} from '../actions';

const initialState = {
  x: 20,
  y: 20
};

export const food = createReducer(initialState, {
  [FOOD_EATEN](state, action) {
    return {x: action.x, y: action.y};
  }
});