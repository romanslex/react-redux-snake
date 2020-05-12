import { combineReducers } from 'redux';
import { food } from './food';
import { general } from './general';
import { snake } from './snake';

export default combineReducers({
  snake,
  food,
  general,
});
