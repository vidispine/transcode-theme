import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { Pause, Info } from '@material-ui/icons';
import {
  withStyles,
  LinearProgress,
  Box,
  IconButton,
  Avatar,
  ListItem,
  Typography,
  Divider,
} from '@material-ui/core';

import { RUNNING_STATES, INACTIVE_STATES } from './const';

const getJobPercentage = ({ task = [] }, type) => {
  let TRANSCODING_STEP = 100;
  if (type === 'TRANSCODE') TRANSCODING_STEP = 200;
  const { progress = {} } = task.find(({ step }) => step === TRANSCODING_STEP) || {};
  return progress.value || 0;
};

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

const styles = ({ palette, spacing }) => ({
  root: {
    backgroundColor: palette.background.paper,
    borderRadius: spacing(0.5),
    padding: spacing(1, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
  },
  top: {
    padding: spacing(1, 2),
    display: 'grid',
    alignItems: 'start',
    gridTemplateColumns: 'auto 1fr auto',
    gap: spacing(2),
    '& > .MuiBox-root': {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: spacing(0, 2),
    },
  },
});

const cols = [
  {
    key: 'type',
    label: 'Job type',
  },
  {
    key: 'jobId',
    label: 'Job ID',
  },
];

const JobCard = ({ jobType = {}, classes, onAbort }) => {
  const { status, log = {}, started, jobId, type } = jobType;
  const onClick = () => INACTIVE_STATES.includes(status) && onAbort(jobId);
  // const onClick = () => RUNNING_STATES.includes(status) && onAbort(jobId);
  return (
    <ListItem className={classes.root} alignItems="flex-start">
      <Box className={classes.top}>
        <Avatar variant="square">J</Avatar>
        <Box>
          <Column data={jobType} fields={cols} />
        </Box>
        <IconButton size="small" onClick={onClick}>
          {RUNNING_STATES.includes(status) && <Pause />}
          {INACTIVE_STATES.includes(status) && <Info />}
        </IconButton>
      </Box>
      <Divider />
      <Box>
        <Box py={1} px={2} display="flex" justifyContent="space-between">
          <Typography color="textPrimary" variant="button">
            {status}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {moment(started).fromNow()}
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={getJobPercentage(log, type)} />
      </Box>
    </ListItem>
  );
};

export default withStyles(styles)(JobCard);
