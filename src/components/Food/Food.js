import './Food.css';

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const Food = ({ food }) => {
  return (
    <div
      className="food"
      style={{
        top: food.y + 'px',
        left: food.x + 'px',
      }}
    />
  );
};

Food.propTypes = {
  food: PropTypes.object,
};

export default connect((state) => ({ food: state.food }))(Food);
