/* eslint-disable no-unused-vars */
import React from 'react';
import get from 'lodash.get';
import { ShapeTagCard } from '@vidispine/vdt-materialui';
import {
  withStyles,
  Box,
  Paper,
  Checkbox,
  ListItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';

import { useGetProfile } from '../../context';

const columnStyles = ({ spacing }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: spacing(1, 2),
  },
});

export const Column = withStyles(columnStyles)(({ fields, data, classes }) => (
  <Box classes={classes}>
    {fields.map(({ key, label }) => (
      <Box key={key} display="contents">
        <Typography variant="body2" color="textSecondary">
          {label}:
        </Typography>
        <Typography noWrap variant="body2" color="textPrimary">
          {get(data, key, '-')}
        </Typography>
      </Box>
    ))}
  </Box>
));

const cols = [
  [
    {
      key: 'containerFormat',
      label: 'Format',
    },
    {
      key: 'dimension',
      label: 'Resolution',
    },
  ],
  [
    {
      key: 'videoFormat',
      label: 'Video codec',
    },
    {
      key: 'audioFormat',
      label: 'Audio codec',
    },
  ],
  [
    {
      key: 'videoBitrate',
      label: 'Video bitrate',
    },
    {
      key: 'frameRate',
      label: 'Framerate',
    },
  ],
];

const styles = ({ spacing, typography }) => ({
  root: {
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr',
    gap: spacing(2),
    alignItems: 'start',
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
  },
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
});

const FileCard = ({ tagName, selected, onChange = () => null, classes }) => {
  const { data = {} } = useGetProfile({ tagName });
  return (
    <Paper className={classes.paper}>
      <ListItem
        disableRipple
        className={classes.root}
        selected={selected}
        button
        onClick={() => onChange(data)}
      >
        <ListItemIcon>
          <Checkbox checked={selected} color="primary" />
        </ListItemIcon>
        <Box>
          <Typography noWrap variant="body1" color="textPrimary">
            {get(data, 'name', '-')}
          </Typography>
          <Typography noWrap variant="caption" color="textSecondary">
            {get(data, 'description', '-')}
          </Typography>
        </Box>
        {cols.map((fields) => (
          <Column key={fields.reduce((a, { key }) => a + key, '')} data={data} fields={fields} />
        ))}
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(FileCard);
