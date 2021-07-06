import React from 'react';
import get from 'lodash.get';
import { withStyles, Box, Checkbox, ListItem, ListItemIcon, Typography } from '@material-ui/core';

import { useGetProfile } from '../Profiles/ProfileContext';

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

const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.background.paper,
    borderRadius: spacing(0.5),
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
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
  },
});

const FileCard = ({ tagName, selected, onChange = () => null, classes }) => {
  const { data = {} } = useGetProfile({ tagName });
  return (
    <ListItem
      selected={selected}
      classes={classes}
      alignItems="flex-start"
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
  );
};

export default withStyles(styles)(FileCard);
