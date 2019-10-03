import React, { Fragment, useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// <=========== Components ===========>
import Search from './components/Search';
import AddPassword from './components/AddPassword/';
import Table from './components/Table/';
import './style.css';

import { requestMasterPassword } from 'services/store/actions/passwordManager';
import { deleteMasterPassword } from 'services/store/actions/passwordManager';

import { useSnackbar } from 'notistack';
import { notif } from 'helper/notif';

const Home = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { requestMasterPassword, masterPassword } = props;
  const [textButton, setTextButton] = useState('Add Password');

  const [filterData, setDataFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState('');

  useEffect(_ => {
    if (props.location.pathname === '/home') {
      setTextButton('Add Password');
    } else {
      setTextButton('Hide');
    }
    requestMasterPassword();
  }, []);
  
  useEffect(_ => {
    setDataFilter(masterPassword.filter(el => el.url.includes(search) || el.username.includes(search) || el.password.includes(search)))
  }, [search, masterPassword]);

  const handleAdd = _ => {
    if (textButton === 'Add Password') {
      setTextButton('Hide');
      props.history.push('/home/add');
    } else if (textButton === 'Hide') {
      setTextButton('Add Password');
      props.history.push('/home');
    }
  };

  const [modalStyle, setModalStyle] = useState({ display: "none" })
  const deleteOne = _ => {
    deleteMasterPassword(deleteId)
      .then(_ => {
        notif('success', 'Password deleted!', enqueueSnackbar, closeSnackbar);
      })
      .catch(err => {
        notif('error', 'Delete failed! Check the log!', enqueueSnackbar, closeSnackbar);
        console.log(err);
      })
    setModalStyle({ display: "none" });
  }

  const showModal = id => {
    setModalStyle({ display: "block" });
    setDeleteId(id);
  }

  const hideModal = _ => {
    setModalStyle({ display: "none" });
  }

  return (
    <Fragment>
      <div id="home-container-box">
        <div id="home-conteiner">
          {/* <button onClick={() => props.history.push('/about')} >About</button> */}
          <div id="header-container">
            <button onClick={() => handleAdd()} id="add-password" aria-label="toggleform" type="button">{ textButton }</button>
            <Route path="/home/add" component={AddPassword}/>
          </div>

          <Search setSearch={setSearch}></Search>
          <Table data={filterData} showModal={showModal}></Table>

          <div id="bg" onClick={hideModal} style={modalStyle}></div>
          <div id="modal-content" style={modalStyle}>
            <button onClick={hideModal} id="close-modal"><i className="fas fa-times"></i></button>
            <p>Are you sure to delete?</p>
            <div id="btn-group">
              <button id="confirm" onClick={_ => {deleteOne()}} data-testid="confirm-delete-data">Sure</button>
              <button id="cancel" onClick={hideModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  masterPassword: state.passwordManager,
});

const mapDispatchToProps = dispatch => ({
  requestMasterPassword: _ => dispatch(requestMasterPassword()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));