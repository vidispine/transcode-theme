import React from 'react';

import { SearchInput } from '@vidispine/vdt-materialui';
import { withStyles } from '@material-ui/core';

const styles = ({ spacing, palette }) => ({
  root: {
    position: ({ fixed }) => (fixed ? 'sticky' : 'relative'),
    zIndex: 10,
    top: 0,
    // marginBottom: spacing(2),
  },
  input: {
    borderWidth: 2,
    borderRadius: spacing(0.5),
    paddingLeft: spacing(2),
    height: spacing(6),
    backgroundColor: palette.background.paper,
    borderColor: palette.primary.main,
  },
  button: {
    color: palette.getContrastText(palette.primary.main),
    borderWidth: 0,
    backgroundColor: palette.primary.main,
  },
});

const Search = ({
  fixed = false,
  onSubmit,
  onChange,
  classes,
  placeholder = 'Search files...',
}) => (
  <SearchInput
    fixed={fixed}
    classes={classes}
    onChange={onChange}
    onSubmit={onSubmit}
    searchPlaceholder={placeholder}
  />
);

export default withStyles(styles)(Search);
