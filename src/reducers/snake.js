import {createReducer} from '../helpers/createReducer';
import {CHANGE_DIRECTION, MOVE} from '../actions';

const initialState = [
  {
    x: 0,
    y: 0,
    direction: 'right'
  }
];

export const snake = createReducer(initialState, {
  [CHANGE_DIRECTION](state, action) {
    const newState = [...state];
    newState[0].direction = action.direction;
    return newState;
  },
  [MOVE](state) {
    let newState = [...state];
    switch (newState[0].direction) {
      case 'right':
        newState[0].x += 20;
        break;
      case 'left':
        newState[0].x -= 20;
        break;
      case 'up':
        newState[0].y -= 20;
        break;
      case 'down':
        newState[0].y += 20;
        break;
      default:
        return newState;
    }
    return newState;
  }
});