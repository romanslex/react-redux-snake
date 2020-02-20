import {createReducer} from '../helpers/createReducer';
import {CHANGE_DIRECTION, FOOD_EATEN, MOVE, RESTART} from '../actions';

const initialState = [
  {
    x: 0,
    y: 0,
    direction: 'right',
  },
];

const oppositeDirections = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
};

export const snake = createReducer(initialState, {
  [RESTART]() {
    return [{x: 0, y: 0, direction: 'right'}];
  },
  [CHANGE_DIRECTION](state, action) {
    if (state.length > 1 && oppositeDirections[state[0].direction] === action.direction)
      return state;

    const newState = [...state];
    newState[0].direction = action.direction;
    return newState;
  },
  [MOVE](state) {
    return state.reverse().map((i, index) => {
      switch (i.direction) {
        case 'right':
          i.x += 20;
          break;
        case 'left':
          i.x -= 20;
          break;
        case 'up':
          i.y -= 20;
          break;
        case 'down':
          i.y += 20;
          break;
      }

      if (index === (state.length - 1))
        return i;

      i.direction = state[index + 1].direction;
      return i;
    }).reverse();
  },
  [FOOD_EATEN](state) {
    const newState = [...state];
    const lastItem = newState[newState.length - 1];
    let x = lastItem.x;
    let y = lastItem.y;
    switch (lastItem.direction) {
      case 'right':
        x = lastItem.x - 20;
        break;
      case 'left':
        x = lastItem.x + 20;
        break;
      case 'up':
        y = lastItem.y + 20;
        break;
      case 'down':
        y = lastItem.y - 20;
        break;
    }
    newState.push({
      x: x,
      y: y,
      direction: lastItem.direction,
    });
    return newState;
  },
});