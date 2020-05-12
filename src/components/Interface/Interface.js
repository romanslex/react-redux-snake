import './Interface.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getSnakeLength } from '../../selectors/snake';
import { restart } from '../../actions';

const Interface = ({ snakeLength, restart }) => {
  return (
    <div className="interface">
      <button className="interface__btn" onClick={() => restart()}>
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
  restart: PropTypes.func,
};

export default connect(
  (state) => ({ snakeLength: getSnakeLength(state) }),
  (dispatch) => ({
    restart: () => dispatch(restart()),
  })
)(Interface);
