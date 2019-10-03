import firebase from 'services/api/firebase/';
const db = firebase.firestore();

import { FETCH_MASTER_PASSWORD } from './actionTypes';

const receiveMasterPassword = masterPassword => ({
  type: FETCH_MASTER_PASSWORD,
  masterPassword,
});

export const requestMasterPassword = _ => {
  return dispatch => {
    db.collection('password-manager')
      .orderBy('updatedAt', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          data.push(temp);
        });
        dispatch(receiveMasterPassword(data));
      })
  }
};

export const editMasterPassword = data => {
  return new Promise ((resolve, reject) => {
    const { url, username, password, } = data;
    db.collection('password-manager').doc(data.id)
      .update({ url, username, password,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()) })
      .then(_ => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  })
};

export const addMasterPassword = data => {
  return new Promise((resolve, reject) => {
    const { url, username, password } = data;
    if (url.length < 1 || username.length < 1 || password < 1) {
      reject('Isi lengkap field!');
    } else {
      db.collection('password-manager').add({ url, username, password, 
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()), 
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()) })
        .then(_ => {
          resolve();
        })
        .catch(err => {
          reject(err);
        })
    }
  });
};

export const deleteMasterPassword = id => {
  return new Promise((resolve, reject) => {
    db.collection('password-manager').doc(id).delete()
      .then(_ => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
};