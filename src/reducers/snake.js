import {createReducer} from '../helpers/createReducer';
import {
  ADD_HEAD_DIRECTION,
  FOOD_EATEN,
  MOVE,
  RESTART,
  SET_HEAD_DIRECTIONS,
} from '../actions';

const initialState = [
  {
    x: 0,
    y: 0,
    direction: 'right',
  },
];

export const snake = createReducer(initialState, {
  [RESTART]() {
    return [{x: 0, y: 0, direction: 'right'}];
  },
  [MOVE](state, action) {
    const newState = [...state];
    newState[0].direction = action.direction;
    return newState.reverse().map((i, index) => {
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

      if (index === (newState.length - 1))
        return i;

      i.direction = newState[index + 1].direction;
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

export const headDirections = createReducer([], {
  [RESTART]() {
    return [];
  },
  [ADD_HEAD_DIRECTION](state, action) {
    return [...state, action.direction];
  },
  [SET_HEAD_DIRECTIONS](state, action) {
    return action.directions;
  }
});