/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

function DefaultDialogComponent({
  open,
  onClose,
  onSuccess,
  title = 'Dialog',
  okText = 'Ok',
  noText = 'Cancel',
  message = 'Message',
  Dialog = MuiDialog,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{noText}</Button>
        <Button variant="contained" color="primary" disableElevation onClick={onSuccess}>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DialogComponent({ Dialog = DefaultDialogComponent, ...props }) {
  return <Dialog {...props} />;
}

const DialogContext = React.createContext({});

function DialogProvider({ children }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [{ config, resolve, reject }, setConfig] = React.useState({});

  const openDialog = (callback) => {
    setDialogOpen(true);
    setConfig(callback);
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setConfig({});
  };

  const onConfirm = (e) => {
    resolve(e);
    resetDialog();
  };

  const onCancel = (e) => {
    reject(e);
    resetDialog();
  };

  const contextValue = React.useMemo(() => ({ openDialog }), []);

  return (
    <DialogContext.Provider value={contextValue}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DialogComponent {...config} open={dialogOpen} onSuccess={onConfirm} onClose={onCancel} />
      {children}
    </DialogContext.Provider>
  );
}

const useDialog = () => {
  const { openDialog } = React.useContext(DialogContext);

  const showDialog = (config) =>
    new Promise((resolve, reject) => {
      openDialog({ config, resolve, reject });
    });

  return { showDialog };
};

export { DialogProvider, useDialog };
