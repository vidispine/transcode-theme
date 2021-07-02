import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { parseMetadataType, parseShapeType } from '@vidispine/vdt-js';
import { Delete, CloudDownload, SwitchVideo } from '@material-ui/icons';
import {
  withStyles,
  Box,
  Avatar,
  MenuItem,
  Checkbox,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { Menu } from '../../components';

const parseItem = ({ metadata = {}, shape: [shape] = [{}] }) => ({
  ...parseMetadataType(metadata, { flat: true, arrayOnSingle: false }),
  ...parseShapeType(shape),
  timestamp:
    shape &&
    shape.containerComponent &&
    moment(shape.containerComponent.file[0].timestamp).format('L'),
});

const Column = ({ fields, data }) =>
  fields.map(({ key, label }) => (
    <Box key={key} display="contents">
      <Typography variant="body2" color="textSecondary">
        {label}:
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {get(data, key, '-')}
      </Typography>
    </Box>
  ));

const cols = [
  [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'fileSize',
      label: 'Filesize',
    },
  ],
  [
    {
      key: 'duration',
      label: 'Duration',
    },
    {
      key: 'timestamp',
      label: 'Timestamp',
    },
    {
      key: 'dimension',
      label: 'Resolution',
    },
    {
      key: 'frameRate',
      label: 'Framerate',
    },
  ],
  [
    {
      key: 'videoCodec',
      label: 'Video codec',
    },
    {
      key: 'videoBitrate',
      label: 'Bitrate',
    },
    {
      key: 'audioCodec',
      label: 'Audio codec',
    },
    {
      key: 'audioChannels',
      label: 'Audio channels',
    },
  ],
];

const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.background.paper,
    borderRadius: spacing(0.5),
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr 1fr 1fr auto',
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
    '& > .MuiBox-root:last-child': {
      gridColumn: '5 / 2 span',
    },
    '& > .MuiAvatar-root:first-child': {
      gridColumn: '1 / 2 span',
    },
  },
});

const FileCard = ({
  itemType = {},
  classes,
  allowTranscode = false,
  onTranscode,
  interactive = true,
}) => {
  const item = React.useMemo(() => parseItem(itemType), [itemType]);
  return (
    <ListItem classes={classes} alignItems="flex-start">
      {interactive && <Checkbox />}
      <Avatar variant="square">T</Avatar>
      {cols.map((fields) => (
        <Box key={fields.reduce((a, { key }) => a + key, '')}>
          <Column data={item} fields={fields} />
        </Box>
      ))}
      {interactive && (
        <Menu>
          {allowTranscode && (
            <MenuItem onClick={() => onTranscode(itemType)}>
              <ListItemIcon>
                <SwitchVideo />
              </ListItemIcon>
              <ListItemText>Transcode</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={() => console.log('download')}>
            <ListItemIcon>
              <CloudDownload />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => console.log('delete')}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      )}
    </ListItem>
  );
};

export default withStyles(styles)(FileCard);
