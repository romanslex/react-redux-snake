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
    isVisible: true
  },
];

export const snake = createReducer(initialState, {
  [RESTART]() {
    return [{x: 20, y: 0, direction: 'right', isVisible: true}, {x: 0, y: 0, direction: 'right', isVisible: true}];
  },
  [MOVE](state, action) {
    const newState = [...state];
    newState.pop();

    const newItem = {...newState[0]};
    newItem.direction = action.direction;
    switch (action.direction) {
      case 'right':
        newItem.x += 20;
        break;
      case 'left':
        newItem.x -= 20;
        break;
      case 'up':
        newItem.y -= 20;
        break;
      case 'down':
        newItem.y += 20;
        break;
    }
    newState.unshift(newItem);
    return newState;
  },
  [FOOD_EATEN](state) {
    const newState = [...state];
    newState.push({...newState[newState.length - 1]});
    return newState;
  },
});

export const headDirections = createReducer([], {
  [RESTART]() {
    return ['down'];
  },
  [ADD_HEAD_DIRECTION](state, action) {
    return [...state, action.direction];
  },
  [SET_HEAD_DIRECTIONS](state, action) {
    return action.directions;
  }
});

