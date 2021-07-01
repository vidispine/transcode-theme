import React from 'react';
import { MoreVert as MenuIcon } from '@material-ui/icons';
import { Menu, ButtonBase, IconButton } from '@material-ui/core';

export default ({ icon: IconComponent = MenuIcon, children, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton component={ButtonBase} onClick={handleMenuClick} disableRipple>
        <IconComponent
          {...props} // eslint-disable-line react/jsx-props-no-spreading
        />
      </IconButton>
      <Menu
        onClick={handleMenuClose}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        elevation={1}
        PaperProps={{ square: true }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {children}
      </Menu>
    </>
  );
};
