import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { editMasterPassword } from 'services/store/actions/passwordManager';
import './style.css';

import { useSnackbar } from 'notistack';
import { notif } from 'helper/notif';

const Table = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { data } = props;
  const [editMode, setEditMode] = useState(false);
  const [idEdit, setIdEdit] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const handleUrl = event => {
    setNewUrl(event.target.value);
  }
  const handleUsername = event => {
    setNewUsername(event.target.value);
  }
  const handlePassword = event => {
    setNewPassword(event.target.value);
  }

  const parseDate = (num) => {
    return `${String(new Date(num * 1000)).substring(0, 15)} - ${String(new Date(num * 1000)).substring(16, 21)}`;
  }

  const handleEdit = data => {
    setIdEdit(data.id);
    setNewUrl(data.url);
    setNewUsername(data.username);
    setNewPassword(data.password);
    setEditMode(data.id);
  }
  
  const handleCloseEdit = _ => {
    setEditMode(false);
  }
  
  const submitDataEdited = _ => {
    setEditMode(false);
    editMasterPassword({id: idEdit, url: newUrl, username: newUsername, password: newPassword})
      .then(_ => {
        notif('success', 'Edit success!', enqueueSnackbar, closeSnackbar);
      })
      .catch(err => {
        notif('error', 'Edit failed! Check the log!', enqueueSnackbar, closeSnackbar);
        console.log(err);
      })
  }

  return (
      <table className="main-table" data-testid="master-table-password">
        <thead>
          <tr>
            <th aria-label="url">URL</th>
            <th aria-label="username">Username</th>
            <th aria-label="password">Password</th>
            <th aria-label="createdAt">Created At</th>
            <th aria-label="updatedAt">Updated At</th>
            <th aria-label="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(el => (
            <tr key={el.id}>
              <td>
                {editMode === el.id ? (
                  <Fragment>
                    <input type="text" value={newUrl} onChange={handleUrl} data-testid="edit-url" />
                    <span className="border-bottom"></span>
                  </Fragment>
                ) : (
                  <span>{el.url}</span>
                )}
              </td>
              <td>
                {editMode === el.id ? (
                  <Fragment>
                    <input type="text" value={newUsername} onChange={handleUsername} data-testid="edit-username" />
                    <span className="border-bottom"></span>
                  </Fragment>
                ) : (
                  <span>{el.username}</span>
                )}
              </td>
              <td>
                {editMode === el.id ? (
                  <Fragment>
                    <input type="text" value={newPassword} onChange={handlePassword} data-testid="edit-password" />
                    <span className="border-bottom"></span>
                  </Fragment>
                ) : (
                  <span>{el.password}</span>
                )}
              </td>
              <td>{parseDate(el.createdAt.seconds)}</td>
              <td>{parseDate(el.updatedAt.seconds)}</td>
              <td>
                {editMode === el.id ? (
                  <Fragment>
                    <button className="confirm-btn" onClick={() => submitDataEdited()} data-testid="submit-edit-data">
                      <i className="fas fa-check"></i>
                    </button>
                    <button className="delete-btn" onClick={() => handleCloseEdit()} data-testid="cancel-edit-data">
                      <i className="fas fa-times"></i>
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <button className="edit-btn" onClick={() => handleEdit(el)} data-testid="edit-data">
                      <i className="fas fa-pen"></i>
                    </button>
                    <button className="delete-btn" onClick={_ => props.showModal(el.id)} data-testid="delete-data">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}


export default connect()(Table);