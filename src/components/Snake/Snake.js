import './Snake.css';

import React, { useEffect } from 'react';
import { handleNewDirection, snakeMove } from '../../actions';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSnakeBody } from '../../selectors/snake';
import { isGameOver } from '../../selectors/general';

const Snake = ({ snakeBody, snakeMove, handleNewDirection, isGameOver }) => {
  useEffect(() => {
    let interval;
    if (!isGameOver) {
      interval = setInterval(() => {
        snakeMove();
      }, 120);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isGameOver]);

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
          direction = 'incorrect';
      }
      handleNewDirection(direction);
    }
    document.addEventListener('keydown', changeDirection);

    return () => document.removeEventListener('keydown', changeDirection);
  }, []);

  return (
    <>
      {snakeBody.map((i, index) => (
        <div
          key={index}
          className="snake"
          style={{
            top: i.y + 'px',
            left: i.x + 'px',
          }}
        />
      ))}
    </>
  );
};

Snake.propTypes = {
  snakeBody: PropTypes.array,
  isGameOver: PropTypes.bool,
  snakeMove: PropTypes.func,
  handleNewDirection: PropTypes.func,
};

export default connect(
  (state) => ({
    snakeBody: getSnakeBody(state),
    isGameOver: isGameOver(state),
  }),
  (dispatch) => ({
    snakeMove: () => dispatch(snakeMove()),
    handleNewDirection: (direction) => dispatch(handleNewDirection(direction)),
  })
)(Snake);
