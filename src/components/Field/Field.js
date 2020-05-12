import './Field.css';

import Food from '../Food/Food';
import React from 'react';
import Snake from '../Snake/Snake';

const Field = () => {
  return (
    <div className="field">
      <Snake />
      <Food />
    </div>
  );
};

export default Field;
