import React from 'react';

import { withStyles } from '@material-ui/core';
import { QueryClientProvider } from 'react-query';
import { Route, Redirect, Switch } from 'react-router-dom';

import { AuthProvider } from '@vidispine/vdt-react';

import { LOGIN_EXPIRES_SECONDS, APP_BASENAME } from '../../const';
import { DialogProvider } from '../../context';
import queryClient from '../../queryClient';
import Login from '../Login';
import NotFound from '../NotFound';
import { Profiles } from '../Profile';
import Search from '../Search';
import Settings from '../Settings';

import Header from './Header';

const styles = ({ mixins, spacing }) => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    paddingTop: mixins.toolbar.minHeight + spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
});

function Root({ classes }) {
  const [loginError, setLoginError] = React.useState();
  const handleLoginError = ({ message }) => {
    setLoginError(message);
    setTimeout(() => setLoginError(), 5000);
  };
  return (
    <AuthProvider
      cookieOptions={{
        maxAge: LOGIN_EXPIRES_SECONDS,
        path: APP_BASENAME,
      }}
      onError={handleLoginError}
      LoginComponent={Login}
      LoginProps={{ error: loginError }}
      serverUrl=""
    >
      <QueryClientProvider client={queryClient}>
        <DialogProvider>
          <Header />
          <div className={classes.container}>
            <Switch>
              <Route exact path="/search/">
                <Search />
              </Route>
              <Route exact path="/search/*">
                <Search />
              </Route>
              <Route exact path="/profile/">
                <Profiles />
              </Route>
              <Route exact path="/settings">
                <Settings />
              </Route>
              <Redirect exact from="/" push to="/search/" />
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </DialogProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default withStyles(styles)(Root);
