import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css';

import { addMasterPassword } from 'services/store/actions/passwordManager';

import { useSnackbar } from 'notistack';
import { notif } from 'helper/notif';

const AddPassword = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [addFormStyle, setAddFormStyle] = useState({ opacity: '0' });
  const [urlField, setUrlField] = useState('');
  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [validUppercase, setValidUpperCase] = useState(false);
  const [validLowercase, setValidLowerCase] = useState(false);
  const [validSpecialChar, setValidSpecialChar] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validLength, setValidLength] = useState(false);
  
  useEffect(_ => {
    setAddFormStyle({ opacity: '1' });
  }, [])

  const handleAddPassword = event => {
    event.preventDefault();
    const data = {
      url: urlField,
      username: usernameField,
      password: passwordField,
    }
    addMasterPassword(data)
    .then(_ => {
      setUrlField('');
      setUsernameField('');
      setPasswordField('');
      setAddFormStyle({ opacity: '0' });
      props.history.push('/home');

      notif('success', 'Add password success!', enqueueSnackbar, closeSnackbar);
    })
    .catch(err => {
      notif('error', err, enqueueSnackbar, closeSnackbar);
    })
  }

  const handleUrlChange = event => {
    setUrlField(event.target.value);
  }

  const handleUsernameChange = event => {
    setUsernameField(event.target.value);
  }

  const handlePasswordChange = event => {
    setPasswordField(event.target.value);
    if (/[A-Z]/.test(event.target.value)) {
      setValidUpperCase(true);
    } else {
      setValidUpperCase(false);
    };
    
    if (/[a-z]/.test(event.target.value)) {
      setValidLowerCase(true);
    } else {
      setValidLowerCase(false);
    };
    
    if (/\W/.test(event.target.value)) {
      setValidSpecialChar(true);
    } else {
      setValidSpecialChar(false);
    };

    if (/\d/.test(event.target.value)) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    };

    if (/.{5,}/.test(event.target.value)) {
      setValidLength(true);
    } else {
      setValidLength(false);
    };
  }

  return (
    <div id="addPassword" style={addFormStyle} aria-label="form-add-password">
      <form onSubmit={handleAddPassword}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="url">URL :</label></td>
              <td><input type="text" id="url" value={urlField} data-testid="url-input" onChange={handleUrlChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor="username">Username :</label></td>
              <td><input type="text" id="username" value={usernameField} data-testid="username-input" onChange={handleUsernameChange} /></td>
            </tr>
            <tr>
              <td><label htmlFor="password">Password :</label></td>
              <td><input type="text" id="password" value={passwordField} data-testid="password-input" onChange={handlePasswordChange} /></td>
            </tr>
            <tr>
              <td colSpan="2" className="simple-validation">
                {validUppercase ?
                  <i className="fas fa-check" aria-label="checkvaliduppercase"></i> :
                  <i className="fas fa-times" aria-label="uncheckvaliduppercase"></i>
                }
                <span>At least password has a uppercase character</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="simple-validation">
                {validLowercase ?
                  <i className="fas fa-check" aria-label="checkvalidlowercase"></i> :
                  <i className="fas fa-times" aria-label="uncheckvalidlowercase"></i>
                }
                <span>At least password has a lowercase character</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="simple-validation">
                {validSpecialChar ?
                  <i className="fas fa-check" aria-label="checkvalidspecialchar"></i> :
                  <i className="fas fa-times" aria-label="uncheckvalidspecialchar"></i>
                }
                <span>At least password has a special character</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="simple-validation">
                {validNumber ?
                  <i className="fas fa-check" aria-label="checkvalidnumber"></i> :
                  <i className="fas fa-times" aria-label="uncheckvalidnumber"></i>
                }
                <span>At least password has a number</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="simple-validation">
                {validLength ?
                  <i className="fas fa-check" aria-label="checkvalidlength"></i> :
                  <i className="fas fa-times" aria-label="uncheckvalidlength"></i>
                }
                <span>At least password has length 5 character</span>
              </td>
            </tr>
            <tr>
              <td colSpan="2"><button type="submit" aria-pressed="false" role="button" label="add-password">Add</button></td>
            </tr>
          </tbody>
        </table>
      </form>      
    </div>
  );
};


export default connect()(withRouter(AddPassword));