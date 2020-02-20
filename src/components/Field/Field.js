import React from 'react';
import './Field.css';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';

export default () => {
  return (
      <div className="field">
        <Snake/>
        <Food/>
      </div>
  );
};