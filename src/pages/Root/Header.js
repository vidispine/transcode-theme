import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAvatarButton } from '@vidispine/vdt-materialui';
import { withStyles, AppBar, Button, Box, Avatar, Typography, Hidden } from '@material-ui/core';
import { useAuthContext } from '@vidispine/vdt-react';

import { APP_TITLE, HEADER_LOGO } from '../../const';

const styles = ({ spacing, palette }) => ({
  root: {
    backgroundColor: palette.background.paper,
    '& .MuiAvatar-root': {
      color: palette.background.paper,
    },
  },
  logo: {
    height: spacing(3),
    width: spacing(3),
  },
  titleText: {
    marginLeft: spacing(2),
    fontWeight: 600,
    background: `linear-gradient(to right, ${palette.secondary.main} 0%, ${palette.primary.main} 28%, ${palette.success.main} 64%, ${palette.success.light} 97%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  spacing: {
    width: '200px',
  },
});

const Link = withStyles(({ typography, palette, spacing, mixins }) => ({
  root: {
    ...typography.subtitle1,
    ...mixins.toolbar,
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
    <AppBar className={classes.root} elevation={0} color="default">
      <Box display="flex" px={2} height={1} alignItems="center" justifyContent="space-between">
        <Box display="flex">
          <Avatar className={classes.logo} variant="square" src={HEADER_LOGO} alt={APP_TITLE} />
          <Hidden smDown>
            <Typography className={classes.titleText}>VidiCore Transcode Theme</Typography>
          </Hidden>
        </Box>
        <Box>
          <Link variant="text" component={NavLink} to="/search" color="inherit" disableRipple>
            Browse
          </Link>
          <Link variant="text" component={NavLink} to="/profile" color="inherit" disableRipple>
            Transcode Profiles
          </Link>
          <Link variant="text" component={NavLink} to="/settings" color="inherit" disableRipple>
            Storage Setup
          </Link>
          <Link variant="text" component={NavLink} to="/about" color="inherit" disableRipple>
            About
          </Link>
        </Box>
        <Box display="flex">
          <Hidden mdDown>
            <div className={classes.spacing} />
          </Hidden>
          <UserAvatarButton userName={userName} onLogout={onLogout} />
        </Box>
      </Box>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
