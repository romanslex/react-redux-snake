import { getRandom } from '../helpers/getRandom';
import { makeActionCreator } from '../helpers/makeActionCreator';

export const ADD_DIRECTION_TO_QUEUE = 'ADD_DIRECTION_TO_QUEUE';
export const MOVE = 'MOVE';
export const SET_FOOD = 'SET_FOOD';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const RESTART = 'RESTART';
export const SET_DIRECTIONS_QUEUE = 'SET_DIRECTIONS_QUEUE';
export const SET_CURRENT_DIRECTION = 'SET_CURRENT_DIRECTION';
export const INCREASE_SNAKE = 'INCREASE_SNAKE';

export const addDirectionToQueue = makeActionCreator(
  ADD_DIRECTION_TO_QUEUE,
  'direction'
);
export const move = makeActionCreator(MOVE, 'direction');
export const setFood = makeActionCreator(SET_FOOD, 'x', 'y');
export const setGameOver = makeActionCreator(SET_GAME_OVER, 'value');
export const restart = makeActionCreator(RESTART);
export const setDirectionsQueue = makeActionCreator(
  SET_DIRECTIONS_QUEUE,
  'directions'
);
export const setCurrentDirection = makeActionCreator(
  SET_CURRENT_DIRECTION,
  'direction'
);
export const increaseSnake = makeActionCreator(INCREASE_SNAKE);

export const snakeMove = () => (dispatch, getState) => {
  const { snake, food } = getState();
  const directionsQueue = [...snake.directionsQueue];

  let direction = snake.currentDirection;
  if (directionsQueue.length > 0) {
    direction = directionsQueue.shift();
    dispatch(setDirectionsQueue(directionsQueue));
    dispatch(setCurrentDirection(direction));
  }

  dispatch(move(direction));

  const snakeBody = [...getState().snake.body];

  if (snakeBody[0].y === food.y && snakeBody[0].x === food.x) {
    const { x, y } = generateFoodCoords(snakeBody);
    dispatch(setFood(x, y));
    dispatch(increaseSnake());
  }

  if (checkForCollision(snakeBody)) {
    dispatch(setGameOver(true));
    return;
  }
};

export const handleNewDirection = (direction) => (dispatch, getState) => {
  const oppositeDirections = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
  };
  const { snake } = getState();

  const lastItem =
    snake.directionsQueue.length > 0
      ? snake.directionsQueue[snake.directionsQueue.length - 1]
      : snake.currentDirection;

  if (
    direction !== lastItem &&
    oppositeDirections[direction] !== lastItem &&
    direction !== 'incorrect'
  ) {
    dispatch(addDirectionToQueue(direction));
  }
};

const generateFoodCoords = (snake) => {
  let flag = true;
  let foodX, foodY;
  const step = 20;

  while (flag) {
    foodX = getRandom(0, 240);
    foodY = getRandom(0, 240);

    foodX -= foodX % step;
    foodY -= foodY % step;

    const result = snake.filter((item) => item.x === foodX && item.y === foodY);

    if (result.length === 0) flag = false;
  }

  return { x: foodX, y: foodY };
};

const checkForCollision = (snake) => {
  const { x: headX, y: headY } = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === headX && snake[i].y === headY) {
      return true;
    }
  }

  return [-20, 260].includes(snake[0].x) || [-20, 260].includes(snake[0].y);
};
