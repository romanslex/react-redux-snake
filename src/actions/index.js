import {makeActionCreator} from '../helpers/makeActionCreator';
import {getRandom} from '../helpers/getRandom';

export const ADD_HEAD_DIRECTION = 'ADD_HEAD_DIRECTION';
export const MOVE = 'MOVE';
export const FOOD_EATEN = 'FOOD_EATEN';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const RESTART = 'RESTART';
export const SET_HEAD_DIRECTIONS = 'SET_HEAD_DIRECTIONS';

export const addHeadDirection = makeActionCreator(ADD_HEAD_DIRECTION, 'direction');
export const move = makeActionCreator(MOVE, 'direction');
export const foodEaten = makeActionCreator(FOOD_EATEN, 'x', 'y');
export const setGameOver = makeActionCreator(SET_GAME_OVER, 'value');
export const restart = makeActionCreator(RESTART);
export const setHeadDirections = makeActionCreator(SET_HEAD_DIRECTIONS, 'directions');

export const snakeMove = () => (dispatch, getState) => {
  const step = 20;
  const {snake, food} = getState();
  const headDirections = [...getState().headDirections];

  let nextX = snake[0].x;
  let nextY = snake[0].y;

  let direction = snake[0].direction;
  if (headDirections.length > 0) {
    direction = headDirections.shift();
    dispatch(setHeadDirections(headDirections));
  }

  switch (direction) {
    case 'right':
      nextX += step;
      break;
    case 'left':
      nextX -= step;
      break;
    case 'up':
      nextY -= step;
      break;
    case 'down':
      nextY += step;
      break;
  }

  snake.forEach(i => {
    if (i.x === nextX && i.y === nextY) {
      dispatch(setGameOver(true));
    }
  });

  if ([-20, 260].includes(nextX) || [-20, 260].includes(nextY)) {
    dispatch(setGameOver(true));
    return;
  }

  dispatch(move(direction));

  if (nextY === food.y && nextX === food.x) {
    eatFood(snake, step, dispatch);
  }
};

export const addDirectionToQueue = direction => (dispatch, getState) => {
  const oppositeDirections = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up'
  };
  const {headDirections, snake} = getState();

  const lastItem = headDirections.length > 0
      ? headDirections[headDirections.length - 1]
      : snake[0].direction;

  if (direction !== lastItem && oppositeDirections[direction] !== lastItem) {
    dispatch(addHeadDirection(direction));
  }
};

const eatFood = (snake, step, dispatch) => {
  let flag = true;
  let foodX, foodY;

  while (flag){

    foodX = getRandom(0, 240);
    foodY = getRandom(0, 240);

    foodX -= foodX % step;
    foodY -= foodY % step;

    const result = snake.filter(item => item.x === foodX && item.y === foodY);

    if (result.length === 0)
      flag = false;
  }
  dispatch(foodEaten(foodX, foodY));
};
