import {combineReducers} from 'redux';
import {snake} from './snake';
import {food} from './food';

export default combineReducers({
  snake,
  food,
});