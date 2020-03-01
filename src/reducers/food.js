import {createReducer} from '../helpers/createReducer';
import {SET_FOOD, RESTART} from '../actions';

const initialState = {
  x: 20,
  y: 20
};

export const food = createReducer(initialState, {
  [RESTART]() {
    return {...initialState};
  },
  [SET_FOOD](state, action) {
    return {x: action.x, y: action.y};
  }
});