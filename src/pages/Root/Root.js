import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { AuthProvider } from '@vidispine/vdt-react';
import { QueryClientProvider } from 'react-query';
import { ConfigurationProvider } from './ConfigurationContext';
import { LOGIN_EXPIRES_SECONDS, APP_BASENAME, VIDISPINE_URL } from '../../const';
import Search from '../Search';
import { ProfileProvider, Profiles } from '../Profiles';
import Login from '../Login';
import NotFound from '../NotFound';
import Header from './components/Header';
import queryClient from '../../queryClient';

const styles = (theme) => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    paddingTop: theme.mixins.toolbar.minHeight,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
});

function Root({ classes }) {
  const [loginError, setLoginError] = React.useState(!VIDISPINE_URL && 'VIDISPINE_URL is unset');
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
      serverUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <ConfigurationProvider>
          <ProfileProvider>
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
                <Redirect exact from="/" push to="/search/" />
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </ProfileProvider>
        </ConfigurationProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default withStyles(styles)(Root);
