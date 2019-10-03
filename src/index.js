import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './services/store/';
import App from './App';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <SnackbarProvider 
    maxSnack={3}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <App />
    </SnackbarProvider>
  </Provider>
  ), document.getElementById('root')
);
