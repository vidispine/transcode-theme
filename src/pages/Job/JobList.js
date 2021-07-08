import React from 'react';
import { useSnackbar } from 'notistack';
import { useApi } from '@vidispine/vdt-react';
import { job as JobApi } from '@vidispine/vdt-api';
import { Box, Tab, Tabs, Paper, Button, CircularProgress } from '@material-ui/core';

import JobCard from './JobCard';
import { useDialog } from '../../context';

import { RUNNING_STATES, INACTIVE_STATES } from './const';

const NUMBER = 10;

const JobList = () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = React.useState('active');
  const [page, setPage] = React.useState(0);
  const onChange = (_, newTab) => {
    setPage(0);
    setTab(newTab);
  };
  const { request, data: { job = [], hits = 0 } = {}, isLoading } = useApi(JobApi.listJob);

  React.useEffect(() => {
    const queryParams = {
      step: true,
      type: 'RAW_IMPORT,PLACEHOLDER_IMPORT,TRANSCODE',
      sort: 'startTime desc',
      first: page * NUMBER,
      number: NUMBER,
      state: tab === 'active' ? RUNNING_STATES : INACTIVE_STATES,
    };
    request({ queryParams });
    const interval = setInterval(() => request({ queryParams }), 15000);
    return () => clearInterval(interval);
  }, [request, page, tab]);

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
    <Box display="grid" gridTemplateRows="auto 1fr auto" gridGap={16}>
      <Paper>
        <Tabs value={tab} onChange={onChange}>
          <Tab disableRipple value="active" label="Active" />
          <Tab disableRipple value="finished" label="Inactive" />
          {isLoading && (
            <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
          )}
        </Tabs>
      </Paper>
      <Box overflow="auto">
        {job.map((jobType) => (
          <JobCard key={jobType.jobId} jobType={jobType} onAbort={onAbort} />
        ))}
        {!isLoading && job.length < 1 && <span>No {tab} jobs found</span>}
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

export default JobList;
