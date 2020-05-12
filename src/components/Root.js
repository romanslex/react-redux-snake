import App from './App';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React from 'react';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;
