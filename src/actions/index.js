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
  let {snake, food} = getState();
  const headDirections = [...getState().headDirections];

  let direction = snake[0].direction;
  if (headDirections.length > 0) {
    direction = headDirections.shift();
    dispatch(setHeadDirections(headDirections));
  }

  dispatch(move(direction));

  snake = [...getState().snake];

  if (snake[0].y === food.y && snake[0].x === food.x) {
    eatFood(snake, step, dispatch);
  }

  if (checkForCollision(snake)) {
    dispatch(setGameOver(true));
    return;
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


const checkForCollision = (snake) => {
  let isCollisionOccurred = false;

  snake.forEach((i, index) => {
    if (index === 0)
      return;
    if (i.x === snake[0].x && i.y === snake[0].y) {
      debugger;
      isCollisionOccurred = true;
    }
  });

  if ([-20, 260].includes(snake[0].x) || [-20, 260].includes(snake[0].y)) {
    debugger;
    isCollisionOccurred = true;
  }

  return isCollisionOccurred;
};