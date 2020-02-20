import {createReducer} from '../helpers/createReducer';
import {SET_GAME_OVER} from '../actions';

const initialState = {
  isGameOver: true
};

export const general = createReducer(initialState, {
  [SET_GAME_OVER](state, action) {
    return {isGameOver: action.value}
  }
});