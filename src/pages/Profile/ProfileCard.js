import React from 'react';
import get from 'lodash.get';
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

const Column = ({ fields, data }) =>
  fields.map(({ key, label }) => (
    <Box key={key} display="contents">
      <Typography variant="body2" color="textSecondary">
        {label}:
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {get(data, key, 'Auto')}
      </Typography>
    </Box>
  ));

const cols = [
  [
    {
      key: 'format',
      label: 'Format',
    },
    {
      key: 'resolution',
      label: 'Resolution',
    },
  ],
  [
    {
      key: 'videoCodec',
      label: 'Video codec',
    },
    {
      key: 'bitrate',
      label: 'Vide bitrate',
    },
  ],
  [
    {
      key: 'audioCodec',
      label: 'Audio codec',
    },
    {
      key: 'audioBitrate',
      label: 'Audio bitrate',
    },
  ],
];

const styles = ({ spacing }) => ({
  root: {
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr',
    gap: spacing(2),
    alignItems: 'start',
    '& .MuiCheckbox-root': {
      padding: spacing(1),
      marginLeft: spacing(-1),
      marginTop: spacing(-1),
    },
    '& > .MuiBox-root': {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: spacing(1, 2),
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
        <Typography variant="body1">{tagName}</Typography>
        {cols.map((fields) => (
          <Box key={fields.reduce((a, { key }) => a + key, '')}>
            <Column data={data} fields={fields} />
          </Box>
        ))}
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(FileCard);
