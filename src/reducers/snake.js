import {createReducer} from '../helpers/createReducer';
import {
  ADD_DIRECTION_TO_QUEUE,
  FOOD_EATEN,
  MOVE,
  RESTART, SET_CURRENT_DIRECTION,
  SET_DIRECTIONS_QUEUE,
} from '../actions';
import {combineReducers} from 'redux';

const bodyInitialState = [{x: 20,y: 0,}, {x: 0,y: 0,}];

const body = createReducer(bodyInitialState, {
  [RESTART]() {
    return [{x: 20,y: 0,}, {x: 0,y: 0,}];
  },
  [MOVE](state, action) {
    const newState = [...state];
    newState.pop();

    const newItem = {...newState[0]};
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

const directionsQueue = createReducer([], {
  [RESTART]() {
    return [];
  },
  [ADD_DIRECTION_TO_QUEUE](state, action) {
    return [...state, action.direction];
  },
  [SET_DIRECTIONS_QUEUE](state, action) {
    return action.directions;
  },
});

const currentDirection = createReducer('right', {
  [RESTART]() {
    return 'right';
  },
  [SET_CURRENT_DIRECTION](state, action) {
    return action.direction;
  }
});

export const snake = combineReducers({
  directionsQueue,
  body,
  currentDirection,
});

