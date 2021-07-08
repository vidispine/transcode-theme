/* eslint-disable no-unused-vars */
import React from 'react';
import { useSnackbar } from 'notistack';
import { useApi } from '@vidispine/vdt-react';
import { job as JobApi } from '@vidispine/vdt-api';
import { Box, Tab, Tabs, List, Paper, Button, CircularProgress } from '@material-ui/core';

import JobCard from './JobCard';
import { useDialog } from '../../context';

import { RUNNING_STATES, INACTIVE_STATES } from './const';

const NUMBER = 10;

const defaultQueryParams = {
  step: true,
  type: 'RAW_IMPORT,PLACEHOLDER_IMPORT,TRANSCODE',
  sort: 'startTime desc',
  number: NUMBER,
};

const JobList = ({ jobListType, page, isLoading, onAbort = () => null, setPage }) => {
  const { job = [], hits = 0 } = jobListType;
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {job.map((jobType) => (
            <JobCard key={jobType.jobId} jobType={jobType} onAbort={onAbort} />
          ))}
          {!isLoading && job.length < 1 && <span>No jobs found</span>}
        </List>
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
  const [page, setPage] = React.useState(0);
  const onChange = (_, newTab) => {
    setPage(0);
    setTab(newTab);
  };
  const {
    request: requestActive,
    data: activeJobs = {},
    isLoading: isLoadingActive,
  } = useApi(JobApi.listJob);
  const getActiveJobs = React.useCallback(() => {
    const queryParams = { ...defaultQueryParams, state: RUNNING_STATES, first: page * NUMBER + 1 };
    requestActive({ queryParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const {
    request: requestFinished,
    data: finishedJobs = {},
    isLoading: isLoadingFinished,
  } = useApi(JobApi.listJob);
  const getFinishedJobs = React.useCallback(() => {
    const queryParams = { ...defaultQueryParams, state: INACTIVE_STATES, first: page * NUMBER + 1 };
    requestFinished({ queryParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  React.useEffect(() => {
    getActiveJobs();
    getFinishedJobs();
    const interval = setInterval(() => {
      getActiveJobs();
      getFinishedJobs();
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tab]);

  const isLoading = isLoadingActive || isLoadingFinished;

  const onAbort = (jobId) =>
    showDialog({
      message: 'Are you sure you want to abort this job?',
      okText: 'Yes, abort job',
      noText: 'No, cancel',
    })
      .then(() => JobApi.abortJob({ jobId }))
      .then(() => enqueueSnackbar('Job aborted!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));

  return (
    <Box display="grid" gridTemplateRows="auto 1fr" gridGap={16}>
      <Paper>
        <Tabs value={tab} onChange={onChange}>
          <Tab disableRipple value="active" label={`Active (${activeJobs.hits || 0})`} />
          <Tab disableRipple value="finished" label={`Finished (${finishedJobs.hits || 0})`} />
          {isLoading && (
            <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
          )}
        </Tabs>
      </Paper>
      <Box overflow="hidden" hidden={tab !== 'active'}>
        <JobList
          jobListType={activeJobs}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          onAbort={onAbort}
        />
      </Box>
      <Box overflow="hidden" hidden={tab !== 'finished'}>
        <JobList jobListType={finishedJobs} page={page} setPage={setPage} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default Jobs;
