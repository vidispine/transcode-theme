import React from 'react';
import { UserAvatarButton } from '@vidispine/vdt-materialui';
import { withStyles, AppBar, Toolbar } from '@material-ui/core';
import { useAuthContext } from '@vidispine/vdt-react';

import { APP_TITLE, HEADER_LOGO } from '../../../const';

const styles = (theme) => ({
  logo: {
    height: `calc(${theme.mixins.toolbar.minHeight}px - ${theme.spacing(4)}px)`,
    marginRight: theme.spacing(4),
  },
  title: {
    flexGrow: 1,
  },
});

function Header({ classes }) {
  const { userName, onLogout } = useAuthContext();
  return (
    <AppBar elevation={0}>
      <Toolbar variant="dense">
        <img className={classes.logo} src={HEADER_LOGO} alt={APP_TITLE} />
        <div className={classes.title}>{APP_TITLE}</div>
        <UserAvatarButton userName={userName} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
