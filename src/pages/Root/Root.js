import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { AuthProvider } from '@vidispine/vdt-react';
import { QueryClientProvider } from 'react-query';
import { ConfigurationProvider } from './ConfigurationContext';
import { LOGIN_EXPIRES_SECONDS, APP_BASENAME } from '../../const';
import Search from '../Search';
import { ProfileProvider, Profiles } from '../Profiles';
import Login from '../Login';
import NotFound from '../NotFound';
import Header from './components/Header';
import queryClient from '../../queryClient';
import { DialogProvider } from '../../components';

const styles = ({ mixins }) => ({
  container: {
    height: '100vh',
    overflow: 'auto',
    // paddingTop: () => {
    //   console.log(mixins);
    //   return mixins.toolbar.minHeight;
    // },
    paddingTop: mixins.toolbar.minHeight,
    // marginRight: spacing(4),
    // marginLeft: spacing(4),
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
    >
      <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          <DialogProvider>
            <ConfigurationProvider>
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
            </ConfigurationProvider>
          </DialogProvider>
        </ProfileProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default withStyles(styles)(Root);
