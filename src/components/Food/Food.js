import React from 'react';
import {connect} from 'react-redux';
import './Food.css';

const Food = ({food}) => {
  return (
      <div className="food" style={{
        top: food.y + 'px',
        left: food.x + 'px'
      }}/>
  );
};

export default connect(
    state => ({food: state.food})
)(Food);
