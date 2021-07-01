import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { SnackbarProvider } from './SnackbarContext';
import LightTheme from './themes/LightTheme';
import Root from './pages/Root';
import { ErrorBoundary } from './components';
import { SplitterProvider } from './context';
import { APP_BASENAME } from './const';

ReactDOM.render(
  <ErrorBoundary>
    <MuiThemeProvider theme={LightTheme}>
      <CssBaseline>
        <SnackbarProvider>
          <SplitterProvider splitters={{ vertical: [75, 25] }}>
            <Router basename={APP_BASENAME}>
              <Root />
            </Router>
          </SplitterProvider>
        </SnackbarProvider>
      </CssBaseline>
    </MuiThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
