import React from 'react';
import {connect} from 'react-redux';
import './Snake.css';

const Snake = ({snake}) => {
  return (
      <>
        {snake.map((i, index) =>
            <div key={index} className="snake" style={{
              top: i.y + 'px',
              left: i.x + 'px'
            }}/>
        )}
      </>
  )
};

export default connect(
    state => ({snake: state.snake})
)(Snake);