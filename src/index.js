import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from './components';
import { APP_BASENAME } from './const';
import { SplitterProvider } from './context';
import Root from './pages/Root';
import LightTheme from './themes/LightTheme';

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
