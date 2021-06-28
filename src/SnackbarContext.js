import React, { createContext, useState } from 'react';
import SnackbarComponent from './SnackbarComponent';

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const hideNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({
      open: false,
      message: notification.message,
      severity: notification.severity,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        setNotification,
        hideNotification,
      }}
    >
      {children}
      <SnackbarComponent
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        hideNotification={hideNotification}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}
