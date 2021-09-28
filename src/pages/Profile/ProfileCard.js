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
  MenuItem,
  Divider,
  ListItemText,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { useGetProfile } from '../../context';
import { Menu } from '../../components';

const columnStyles = ({ spacing }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: spacing(1, 2),
    '&:last-child': {
      gridColumnEnd: 'span 2',
    },
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

const styles = ({ spacing }) => ({
  root: {
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr auto',
    gap: spacing(2),
    alignItems: 'start',
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
    '& *:first-child.MuiBox-root': {
      gridColumn: '1 / 2 span',
    },
  },
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
});

const ProfileCard = ({
  tagName,
  onChange = () => null,
  onDelete = () => null,
  onSelect = () => null,
  selected,
  checkbox = true,
  interactive = false,
  classes,
}) => {
  const { data = {} } = useGetProfile({ tagName });
  const { raw = {} } = data;
  const onClick = () => onSelect && onSelect({ tagName });
  return (
    <Paper className={classes.paper}>
      <ListItem disableRipple className={classes.root} selected={selected} button onClick={onClick}>
        {checkbox && (
          <ListItemIcon>
            <Checkbox onChange={() => onSelect({ tagName })} checked={selected} color="primary" />
          </ListItemIcon>
        )}
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
        {interactive && (
          <Menu>
            <MenuItem onClick={() => onChange(raw)}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText
                primary="Edit profile"
                secondary="Edit the properties of the transcode profile"
              />
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => onDelete(tagName)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <ListItemText
                primary="Delete profile"
                primaryTypographyProps={{ color: 'error' }}
                secondary="This action cannot be undone"
              />
            </MenuItem>
          </Menu>
        )}
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(ProfileCard);
