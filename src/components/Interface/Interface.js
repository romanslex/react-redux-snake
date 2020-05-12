import './Interface.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { restart } from '../../actions';

const Interface = ({ snakeLength, dispatch }) => {
  return (
    <div className="interface">
      <button className="interface__btn" onClick={() => dispatch(restart())}>
        Начать игру
      </button>
      <div className="interface__score">
        <span>Длинна змейки: </span>
        <span>{snakeLength}</span>
      </div>
    </div>
  );
};

Interface.propTypes = {
  snakeLength: PropTypes.number,
  dispatch: PropTypes.func,
};

export default connect((state) => ({ snakeLength: state.snake.body.length }))(
  Interface
);
