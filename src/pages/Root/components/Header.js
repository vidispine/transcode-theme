import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAvatarButton } from '@vidispine/vdt-materialui';
import { withStyles, AppBar, Button, Box, Avatar } from '@material-ui/core';
import { useAuthContext } from '@vidispine/vdt-react';

import { APP_TITLE, HEADER_LOGO } from '../../../const';

const styles = ({ spacing }) => ({
  logo: {
    height: spacing(3),
    width: spacing(3),
  },
});

const Link = withStyles(({ typography, palette, spacing }) => ({
  root: {
    ...typography.subtitle1,
    textTransform: 'none',
    opacity: 0.8,
    '&::after': {
      color: palette.primary.main,
      transition: 'width 0.25s ease-in-out 0.05s',
      borderBottom: '0.25em solid',
      width: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      content: '""',
    },
    '&:hover, &.active': {
      opacity: 1,
      backgroundColor: 'unset',
      '&::after': {
        width: '100%',
      },
    },
    '&:not(:last-child)': {
      marginRight: spacing(2),
    },
  },
}))(Button);

function Header({ classes }) {
  const { userName, onLogout } = useAuthContext();
  return (
    <AppBar elevation={0} color="default">
      <Box display="flex" px={2} height={52} alignItems="center" justifyContent="space-between">
        <Avatar className={classes.logo} variant="square" src={HEADER_LOGO} alt={APP_TITLE} />
        <Box>
          <Link variant="text" component={NavLink} to="/search" color="inherit" disableRipple>
            Home
          </Link>
          <Link variant="text" component={NavLink} to="/profile" color="inherit" disableRipple>
            Profiles
          </Link>
          <Link variant="text" component={NavLink} to="/settings" color="inherit" disableRipple>
            Settings
          </Link>
          <Link variant="text" component={NavLink} to="/about" color="inherit" disableRipple>
            About
          </Link>
        </Box>
        <UserAvatarButton className={classes.avatar} userName={userName} onLogout={onLogout} />
      </Box>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
