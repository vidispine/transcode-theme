import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const CustomSnackbar = ({ open, message, severity, hideNotification }) => (
  <Snackbar open={open} autoHideDuration={2000} onClose={hideNotification}>
    <MuiAlert elevation={6} variant="filled" severity={severity} onClose={hideNotification}>
      {message}
    </MuiAlert>
  </Snackbar>
);

export default CustomSnackbar;
