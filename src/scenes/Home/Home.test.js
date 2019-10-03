import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../services/store/';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import Home from './';
import AddPassword from './components/AddPassword/';

afterEach(cleanup);

jest.mock('../../services/store/actions/passwordManager');

test('should render home and find all headers table', () => {
  const { queryByTestId, queryByLabelText } = render(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <Home />
        </Router>
      </SnackbarProvider>
    </Provider>
  )
  expect(queryByTestId("master-table-password")).toBeInTheDocument()
  expect(queryByLabelText("url")).toBeInTheDocument();
  expect(queryByLabelText("username")).toBeInTheDocument();
  expect(queryByLabelText("password")).toBeInTheDocument();
  expect(queryByLabelText("createdAt")).toBeInTheDocument();
  expect(queryByLabelText("updatedAt")).toBeInTheDocument();
  expect(queryByLabelText("actions")).toBeInTheDocument();
})

test('should widget password scanner work successfully', () => {
  const { queryByTestId, queryByLabelText, debug, getByText } = render(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <AddPassword />
        </Router>
      </SnackbarProvider>
    </Provider>
  )

  expect(getByText(/uppercase char/i));
  expect(getByText(/lowercase char/i));
  expect(getByText(/special char/i));
  expect(getByText(/number/i));
  expect(getByText(/length 5/i));

  fireEvent.change(queryByTestId("password-input"), {target: {value: 'A'}});
  expect(queryByLabelText("checkvaliduppercase")).toBeInTheDocument();
  
  fireEvent.change(queryByTestId("password-input"), {target: {value: 'Ad'}});
  expect(queryByLabelText("checkvalidlowercase")).toBeInTheDocument();
  
  fireEvent.change(queryByTestId("password-input"), {target: {value: 'Ad#'}});
  expect(queryByLabelText("checkvalidspecialchar")).toBeInTheDocument();
  
  fireEvent.change(queryByTestId("password-input"), {target: {value: 'Ad#1'}});
  expect(queryByLabelText("checkvalidnumber")).toBeInTheDocument();
  
  fireEvent.change(queryByTestId("password-input"), {target: {value: 'Ad#1n'}});
  expect(queryByLabelText("checkvalidlength")).toBeInTheDocument();

  // debug();
})


// TESTING NESTED ROUTE 
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

test('should add password work successfully', () => {
  const { queryByTestId } = renderWithRouter(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <AddPassword />
        </Router>
      </SnackbarProvider>
    </Provider>
  )


  fireEvent.change(queryByTestId("url-input"), {target: {value: 'http://localhost:3000'}});
  fireEvent.change(queryByTestId("username-input"), {target: {value: 'admin'}});
  fireEvent.change(queryByTestId("password-input"), {target: {value: 'Ad#1n'}});
  
  // REDIRECT TEST 
  // fireEvent.submit(queryByLabelText("add-password"));
  
  // debug();
});


test('should edit password work successfully', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <Home />
        </Router>
      </SnackbarProvider>
    </Provider>
  )

  fireEvent.click(queryByTestId("edit-data"));
  fireEvent.change(queryByTestId("edit-password"), {target: {value: 'Ad#1n'}});
  fireEvent.click(queryByTestId("submit-edit-data"));
  // debug();
});

test('should delete password work successfully', () => {
  const { queryByTestId, debug } = render(
    <Provider store={store}>
      <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
        <Router>
          <Home />
        </Router>
      </SnackbarProvider>
    </Provider>
  )

  fireEvent.click(queryByTestId("delete-data"));
  fireEvent.click(queryByTestId("confirm-delete-data"));
  debug();
});

