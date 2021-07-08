import React from 'react';

import { SearchInput } from '@vidispine/vdt-materialui';
import { withStyles, Paper } from '@material-ui/core';

const styles = ({ spacing, palette, transitions }) => ({
  root: {
    position: ({ fixed }) => (fixed ? 'sticky' : 'relative'),
    zIndex: 10,
    top: 0,
  },
  input: {
    overflow: 'hidden',
    borderWidth: 0,
    borderRadius: spacing(0.5),
    paddingLeft: spacing(2),
    height: spacing(6),
    backgroundColor: palette.background.paper,
    borderColor: palette.primary.main,
    transition: transitions.create(['box-shadow']),
  },
  button: {
    color: palette.getContrastText(palette.primary.main),
    borderWidth: 0,
    backgroundColor: palette.primary.main,
  },
  focused: {
    boxShadow: `inset 0 0 0 2px ${palette.primary.main}`,
  },
});

const Search = ({
  value,
  fixed = false,
  onSubmit,
  onChange,
  classes: { root, ...rest },
  placeholder = 'Search files...',
}) => (
  <Paper className={root}>
    <SearchInput
      value={value}
      fixed={fixed}
      classes={rest}
      onChange={onChange}
      onSubmit={onSubmit}
      searchPlaceholder={placeholder}
    />
  </Paper>
);

export default withStyles(styles)(Search);
