import {makeActionCreator} from '../helpers/makeActionCreator';
import {getRandom} from '../helpers/getRandom';

export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
export const MOVE = 'MOVE';
export const FOOD_EATEN = 'FOOD_MOVE';

export const changeDirection = makeActionCreator(CHANGE_DIRECTION, 'direction');
export const move = makeActionCreator(MOVE);
export const foodEaten = makeActionCreator(FOOD_EATEN, 'x', 'y');

export const snakeMove = () => (dispatch, getState) => {
  const step = 20;
  const {snake, food} = getState();
  let nextX = snake[0].x;
  let nextY = snake[0].y;

  switch (snake[0].direction) {
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

  if (nextY === food.y && nextX === food.x) {
    let foodX = getRandom(0, 940);
    let foodY = getRandom(0, 540);
    foodX -= foodX % step;
    foodY -= foodY % step;
    dispatch(foodEaten(foodX, foodY));
  }

  dispatch(move());
};
