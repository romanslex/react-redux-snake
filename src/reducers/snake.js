import {createReducer} from '../helpers/createReducer';

const initialState = [
  {
    x: 0,
    y: 0,
    direction: 'right'
  }
];

const step = 20;

export const snake = createReducer(initialState, {

});