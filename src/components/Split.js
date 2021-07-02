import RSplit from 'react-split';
import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    '& > *': {
      overflow: 'hidden',
    },
    display: 'flex',
    width: '100%',
    // height: '100%',
    '& .gutter': {
      backgroundColor: theme.palette.background.secondary,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
    '& .gutter.gutter-horizontal': {
      flexDirection: 'column',
      cursor: 'col-resize',
      backgroundImage:
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')",
    },
    '& .gutter.gutter-vertical': {
      flexDirection: 'row',
      cursor: 'row-resize',
      backgroundImage:
        "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=')",
    },
  },
});

function Split({ classes, children, ...props }) {
  return (
    <RSplit
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={classes.root}
    >
      {children}
    </RSplit>
  );
}

export default withStyles(styles)(Split);
