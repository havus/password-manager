import { FETCH_MASTER_PASSWORD, MOCK_ADD_PASSWORD, MOCK_EDIT_PASSWORD, MOCK_DELETE_PASSWORD } from '../actions/actionTypes';

const initialState = [];

export const passwordManager = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MASTER_PASSWORD:
      return [...action.masterPassword];
    case MOCK_ADD_PASSWORD:
      return [...state, ...action.newData];
    case MOCK_EDIT_PASSWORD:
      const temp = state.filter(el => el.id === action.data.id);
      temp.url = action.data.url;
      temp.username = action.data.username;
      temp.password = action.data.password;
      temp.createdAt = action.data.createdAt;
      temp.updatedAt = new Date();

      return [...state.filter(el => el.id !== action.data.id), temp];
    case MOCK_DELETE_PASSWORD:
      return [...state.filter(el => el.id !== action.id)];
    default:
      return state;
  }
}