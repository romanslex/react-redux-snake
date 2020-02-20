import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './Snake.css';
import {
  changeDirection as changeDirectionAction,
  snakeMove,
} from '../../actions';

const Snake = ({snake, dispatch}) => {

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(snakeMove());
    }, 80);
    return () => clearInterval(interval);
  }, [dispatch]);

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
          direction = 'stop';
      }
      dispatch(changeDirectionAction(direction));
    }
    document.addEventListener('keydown', changeDirection);

    return () => document.removeEventListener('keydown', changeDirection);
  }, [dispatch]);

  return (
      <>
        {snake.map((i, index) =>
            <div key={index} className="snake" style={{
              top: i.y + 'px',
              left: i.x + 'px',
            }}/>
        )}
      </>
  );
};

export default connect(
    state => ({snake: state.snake}),
)(Snake);