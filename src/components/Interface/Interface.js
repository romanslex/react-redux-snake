import React from 'react';
import {connect} from 'react-redux';
import './Interface.css';
import {setGameOver} from '../../actions';

const Interface = ({snakeLength, dispatch}) => {
  return (
      <div className="interface">
        <button className="interface__btn" onClick={() => dispatch(setGameOver(false))}>Начать игру</button>
        <div className="interface__score">
          <span>Длинна змейки: </span>
          <span>{snakeLength}</span>
        </div>
      </div>
  );
};

export default connect(
    state => ({snakeLength: state.snake.length})
)(Interface);

