import { RESTART, SET_FOOD } from '../actions';

import { createReducer } from '../helpers/createReducer';

const initialState = {
  x: 20,
  y: 20,
};

export const food = createReducer(initialState, {
  [RESTART]() {
    return { ...initialState };
  },
  [SET_FOOD](state, action) {
    return { x: action.x, y: action.y };
  },
});
