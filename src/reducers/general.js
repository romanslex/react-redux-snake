import {createReducer} from '../helpers/createReducer';
import {RESTART, SET_GAME_OVER} from '../actions';

const initialState = {
  isGameOver: true
};

export const general = createReducer(initialState, {
  [RESTART]() {
    return {isGameOver: false};
  },
  [SET_GAME_OVER](state, action) {
    return {isGameOver: action.value}
  }
});