import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import newStore from './store';

import './index.css';

ReactDOM.render(
  <Provider store={newStore()} >
    <App />
  </Provider>,
  document.getElementById('root')
);
