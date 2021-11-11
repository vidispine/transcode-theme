import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { job as JobApi } from '@vidispine/vdt-api';
import { Delete, Info } from '@material-ui/icons';
import {
  withStyles,
  LinearProgress,
  Box,
  IconButton,
  ListItem,
  // Avatar,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';

import {
  RUNNING_STATES,
  INACTIVE_STATES,
  WARNING_STATES,
  ERROR_STATES,
  SUCCESSFUL_STATES,
} from './const';

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

const styles = ({ spacing, palette }) => ({
  root: {
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
    gridTemplateColumns: '1fr auto',
    gap: spacing(2),
    '& > .MuiBox-root': {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: spacing(0, 2),
    },
  },
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
  successState: {
    color: palette.success.main,
  },
  errorState: {
    color: palette.error.main,
  },
  warningState: {
    color: palette.warning.main,
  },
  defaultState: {
    color: palette.primary.main,
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

const usePoll = ({ jobId, type, status: initialStatus }) => {
  const [value, setValue] = React.useState(0);
  const request = React.useCallback(() => {
    const poll = () =>
      JobApi.getJob({ jobId }).then(({ data: { status, log = {} } = {} }) => {
        let TRANSCODING_STEP = 100;
        if (type === 'TRANSCODE') TRANSCODING_STEP = 200;
        const { task } = log;
        const { progress = {} } = task.find(({ step }) => step === TRANSCODING_STEP) || {};
        setValue(progress.value || 0);
        if (RUNNING_STATES.includes(status)) setTimeout(() => poll(), 2500);
      });
    if (INACTIVE_STATES.includes(initialStatus)) setValue(100);
    else poll();
  }, [jobId, type, initialStatus]);
  return { request, value };
};

const JobCard = ({ jobType = {}, classes, onAbort, hideProgress }) => {
  const [{ status, started, jobId }] = React.useState(jobType);
  const onClick = () => RUNNING_STATES.includes(status) && onAbort(jobId);
  const { request, value = 100 } = usePoll(jobType);
  React.useEffect(request, [request]);
  const getClassName = () => {
    if (SUCCESSFUL_STATES.includes(status)) return classes.successState;
    if (ERROR_STATES.includes(status)) return classes.errorState;
    if (WARNING_STATES.includes(status)) return classes.warningState;
    return classes.defaultState;
  };
  return (
    <Paper className={classes.paper}>
      <ListItem className={classes.root}>
        <Box className={classes.top}>
          {/* <Avatar variant="square">J</Avatar> */}
          <Box>
            <Column data={jobType} fields={cols} />
          </Box>
          <IconButton size="small" onClick={onClick}>
            {RUNNING_STATES.includes(status) && <Delete />}
            {INACTIVE_STATES.includes(status) && <Info />}
          </IconButton>
        </Box>
        <Divider />
        <Box>
          <Box pt={1} px={2} display="flex" justifyContent="space-between">
            <Typography color="textPrimary" variant="button" className={getClassName(status)}>
              {status}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              {moment(started).fromNow()}
            </Typography>
          </Box>
          {!hideProgress && (
            <Box pt={1}>
              <LinearProgress
                color={RUNNING_STATES.includes(status) && !value ? 'secondary' : 'primary'}
                variant={
                  RUNNING_STATES.includes(status) && !value ? 'indeterminate' : 'determinate'
                }
                value={value}
              />
            </Box>
          )}
        </Box>
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(JobCard);
