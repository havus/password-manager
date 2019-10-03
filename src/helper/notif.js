import React from 'react';

export const notif = (variant, message, enqueueSnackbar, closeSnackbar) => {
  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 1500,
    action: key => (
      <i className="fas fa-times" 
      aria-label="close-notif"
      onClick={_ => { closeSnackbar(key) }}
      ></i>
    )
  });
}