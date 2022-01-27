/* eslint-disable no-unused-vars */
import React from 'react';
import { useSnackbar } from 'notistack';
import { useApi } from '@vidispine/vdt-react';
import { useQueryClient } from 'react-query';

import { job as JobApi } from '@vidispine/vdt-api';
import {
  Box,
  Tab,
  Tabs,
  List,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import JobCard from './JobCard';
import { useDialog } from '../../context';

import { RUNNING_STATES, INACTIVE_STATES } from './const';
import { useGetJobs } from '../../hooks/job';
import JobDialog from './JobDialog';

const NUMBER = 10;

const defaultQueryParams = {
  step: true,
  type: 'RAW_IMPORT,PLACEHOLDER_IMPORT,TRANSCODE',
  sort: 'startTime desc',
  number: NUMBER,
};

const JobList = ({
  jobListType,
  page,
  isLoading,
  onAbort = () => null,
  onInfo = () => null,
  setPage,
  hideProgress = false,
}) => {
  const { job = [], hits = 0 } = jobListType;
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {job.map((jobType) => (
            <JobCard
              key={jobType.jobId}
              jobType={jobType}
              onAbort={onAbort}
              onInfo={onInfo}
              hideProgress={!!hideProgress}
            />
          ))}
        </List>
        {!isLoading && job.length < 1 && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="overline">No active jobs</Typography>
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={!page} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <Button disabled={(page + 1) * NUMBER > hits} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

const Jobs = () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = React.useState('active');
  const [activePage, setActivePage] = React.useState(0);
  const [inactivePage, setInactivePage] = React.useState(0);
  const onChange = (_, newTab) => {
    setTab(newTab);
  };

  const { data: { data: activeJobs = {}, isFetching: isFetchingActive } = {} } = useGetJobs(
    'active',
    {
      state: RUNNING_STATES,
      first: activePage * NUMBER + 1,
    },
  );
  const { data: { data: finishedJobs = {} } = {}, isFetching: isFetchingInactive } = useGetJobs(
    'inactive',
    {
      state: INACTIVE_STATES,
      first: inactivePage * NUMBER + 1,
    },
  );

  const isLoading = isFetchingActive || isFetchingInactive;

  const onAbort = (jobId) =>
    showDialog({
      message: 'Are you sure you want to abort this job?',
      okText: 'Yes, abort job',
      noText: 'No, cancel',
    })
      .then(() => JobApi.abortJob({ jobId }))
      .then(() => enqueueSnackbar('Job aborted!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));

  const onInfo = (jobType) => showDialog({ Dialog: JobDialog, jobType }).catch(() => null);
  return (
    <Box display="grid" gridTemplateRows="auto 1fr" gridGap={16}>
      <Paper>
        <Tabs value={tab} onChange={onChange}>
          <Tab disableRipple value="active" label={`Active jobs (${activeJobs.hits || 0})`} />
          <Tab disableRipple value="finished" label={`Finished jobs (${finishedJobs.hits || 0})`} />
          {isLoading && (
            <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
          )}
        </Tabs>
      </Paper>
      {tab === 'active' ? (
        <Box overflow="hidden">
          <JobList
            jobListType={activeJobs}
            page={activePage}
            setPage={setActivePage}
            isLoading={isLoading}
            onAbort={onAbort}
          />
        </Box>
      ) : (
        <Box overflow="hidden">
          <JobList
            hideProgress
            jobListType={finishedJobs}
            page={inactivePage}
            setPage={setInactivePage}
            isLoading={isLoading}
            onInfo={onInfo}
          />
        </Box>
      )}
    </Box>
  );
};

export default Jobs;
