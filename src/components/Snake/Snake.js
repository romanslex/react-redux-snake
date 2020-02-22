import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './Snake.css';
import {
  handleNewDirection,
  snakeMove,
} from '../../actions';

const Snake = ({snakeBody, dispatch, isGameOver}) => {

  useEffect(() => {
    let interval;
    if (!isGameOver) {
      interval = setInterval(() => {
        dispatch(snakeMove());
      }, 80);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [dispatch, isGameOver]);

  useEffect(() => {
    function changeDirection(event) {
      let direction = '';
      switch (event.code) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        default:
          direction = 'right';
      }
      dispatch(handleNewDirection(direction));
    }
    document.addEventListener('keydown', changeDirection);

    return () => document.removeEventListener('keydown', changeDirection);
  }, [dispatch]);

  return (
      <>
        {snakeBody.map((i, index) =>
            <div key={index} className="snake" style={{
              top: i.y + 'px',
              left: i.x + 'px',
            }}/>
        )}
      </>
  );
};

export default connect(
    state => ({
      snakeBody: state.snake.body,
      isGameOver: state.general.isGameOver
    }),
)(Snake);