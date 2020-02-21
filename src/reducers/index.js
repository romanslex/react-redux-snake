import {combineReducers} from 'redux';
import {headDirections, snake} from './snake';
import {food} from './food';
import {general} from './general';

export default combineReducers({
  snake,
  food,
  general,
  headDirections,
});