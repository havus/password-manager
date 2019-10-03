import { FETCH_MASTER_PASSWORD, MOCK_ADD_PASSWORD, MOCK_EDIT_PASSWORD, MOCK_DELETE_PASSWORD } from '../actionTypes';

const mockAddMasterPassword = newData => ({
  type: MOCK_ADD_PASSWORD,
  newData,
});

const mockEditMasterPassword = data => ({
  type: MOCK_EDIT_PASSWORD,
  data,
});

const mockDeleteMasterPassword = id => ({
  type: MOCK_DELETE_PASSWORD,
  id,
});

const receiveMasterPassword = masterPassword => ({
  type: FETCH_MASTER_PASSWORD,
  masterPassword,
});

export const requestMasterPassword = _ => {
  return dispatch => {
    let data = [{
      id: 1,
      url: 'http://localhost',
      username: 'admin',
      password: 'admin123',
      createdAt: {
        nanoseconds: 571000000,
        seconds: 1567956332
      },
      updatedAt: {
        nanoseconds: 571000000,
        seconds: 1567956332
      },
    }]
    dispatch(receiveMasterPassword(data));
  }
};

export const addMasterPassword = data => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      dispatch(mockAddMasterPassword(data));
      resolve();
    })
  }
};

export const editMasterPassword = data => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      data.updatedAt = new Date();
      dispatch(mockEditMasterPassword(data));
      resolve();
    })
  }
};

export const deleteMasterPassword = id => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      dispatch(mockDeleteMasterPassword(id));
      resolve();
    })
  }
};