import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { parseMetadataType, parseShapeType } from '@vidispine/vdt-js';
import { CloudDownload, SwitchVideo, InsertDriveFile as FileIcon } from '@material-ui/icons';
import {
  withStyles,
  Tooltip,
  Box,
  Avatar,
  Checkbox,
  ListItem,
  Paper,
  Typography,
  ListItemIcon,
  Button,
} from '@material-ui/core';

const getFileData = (shape = {}) => {
  const { containerComponent = {} } = shape;
  const { file = [{}] } = containerComponent;
  const [{ timestamp, id: fileId, storage: storageId }] = file;
  return { timestamp: moment(timestamp).format('L'), fileId, storageId };
};

const parseItem = ({ metadata = {}, shape: [shape] = [{}] }) => ({
  ...parseMetadataType(metadata, { flat: true, arrayOnSingle: false }),
  ...parseShapeType(shape),
  ...getFileData(shape),
});

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
      key: 'title',
      label: 'Title',
    },
    {
      key: 'itemId',
      label: 'ID',
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

const styles = ({ spacing, typography }) => ({
  root: {
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr 1fr 1fr auto',
    gap: spacing(2),
    alignItems: 'start',
    '& > .MuiAvatar-root': {
      display: 'flex',
      flexDirection: 'column',
      fontSize: typography.fontSize,
    },
    '& > .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginLeft: spacing(-1),
      marginTop: spacing(-1),
    },
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
    '& > *:first-child:not(.MuiListItemIcon-root)': {
      gridColumn: '1 / 2 span',
    },
    '& > *:last-child:nth-child(4)': {
      gridColumn: '5 / 2 span',
    },
  },
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
});

const FileCard = ({
  itemType = {},
  classes,
  allowTranscode = false,
  onTranscode,
  onDelete = () => null,
  // onDownload = () => null,
  interactive = true,
  checkbox = false,
}) => {
  const { thumbnails: { uri = [] } = {} } = itemType;
  const [thumbnail] = uri;
  const item = React.useMemo(() => parseItem(itemType), [itemType]);
  return (
    <Paper className={classes.paper}>
      <ListItem button disableRipple className={classes.root}>
        {interactive && checkbox && (
          <ListItemIcon>
            <Checkbox />
          </ListItemIcon>
        )}
        <Avatar variant="square" src={thumbnail}>
          {!thumbnail && <FileIcon />}
        </Avatar>
        {cols.map((fields) => (
          <Column key={fields.reduce((a, { key }) => a + key, '')} data={item} fields={fields} />
        ))}
        {interactive && (
          <Box
            height={1}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            {allowTranscode && (
              <>
                <Button
                  disableElevation
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<SwitchVideo />}
                  onClick={() => onTranscode(itemType)}
                >
                  Transcode file
                </Button>
                <Tooltip title="Download the file locally">
                  <Button
                    component={Link}
                    to={item.uri}
                    size="small"
                    variant="text"
                    color="inherit"
                  >
                    Download file
                  </Button>
                </Tooltip>
                <Tooltip title="File on storage will be deleted">
                  <Button
                    size="small"
                    variant="text"
                    color="inherit"
                    onClick={() => onDelete(item.itemId)}
                  >
                    Delete file
                  </Button>
                </Tooltip>
              </>
            )}
            {!allowTranscode && (
              <>
                <Button
                  disableElevation
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<CloudDownload />}
                  component={Link}
                  to={item.uri}
                >
                  Download file
                </Button>
                <Tooltip title="File on storage will be deleted">
                  <Button
                    size="small"
                    variant="text"
                    color="inherit"
                    onClick={() => onDelete(item.itemId)}
                  >
                    Delete file
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        )}
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(FileCard);
