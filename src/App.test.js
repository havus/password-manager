import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import store from './services/store/';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

test('renders without crashing', () => {
  const {  } = render(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </Provider>
  )
});