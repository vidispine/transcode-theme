import React from 'react';
import { LoginForm } from '@vidispine/vdt-materialui';
import { withStyles, Grid, Hidden } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { APP_TITLE, APP_LOGO } from '../../const';

const styles = (theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
  },
  gridLeft: {
    padding: theme.spacing(4),
  },
  gridRight: {
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.login,
  },
  logo: {
    backgroundColor: theme.palette.common.white,
    maxWidth: '25vw',
  },
});

function Login({ classes, onLogin, userName, serverUrl, error }) {
  return (
    <Grid className={classes.root} container direction="row" alignItems="center">
      <Grid item xs={12} sm={12} md={6} lg={3} className={classes.gridLeft}>
        <Alert
          style={{ visibility: error ? 'visible' : 'hidden' }}
          severity="error"
          className={classes.alert}
        >
          {error}
        </Alert>
        <LoginForm
          onSubmit={onLogin}
          FormProps={{
            initialValues: { userName, serverUrl },
          }}
          UrlFieldComponent={null}
          RememberMeFieldComponent={null}
        />
      </Grid>
      <Hidden smDown>
        <Grid item sm className={classes.gridRight}>
          <img src={APP_LOGO} alt={APP_TITLE} className={classes.logo} />
        </Grid>
      </Hidden>
    </Grid>
  );
}

export default withStyles(styles)(Login);
