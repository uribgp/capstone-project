import React from 'react';
import ReactDOM from 'react-dom';
import './global.scss';
import './variables.scss';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Layout from './components/Shared/Layout/Layout';

const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
