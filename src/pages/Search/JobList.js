import React from 'react';
import { useSnackbar } from 'notistack';
import { useApi } from '@vidispine/vdt-react';
import { job as JobApi } from '@vidispine/vdt-api';
import { Box, Tab, Tabs, List, CircularProgress } from '@material-ui/core';

import JobCard from './JobCard';
import { useDialog } from '../../components';

const JobList = () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = React.useState('active');
  const onChange = (_, newTab) => setTab(newTab);
  const { request, data: { job = [] } = {}, isLoading } = useApi(JobApi.listJob);

  React.useEffect(() => {
    const queryParams = {
      step: true,
      type: 'RAW_IMPORT,PLACEHOLDER_IMPORT,TRANSCODE',
      sort: 'startTime desc',
    };
    request({ queryParams });
    const interval = setInterval(() => request({ queryParams }), 15000);
    return () => clearInterval(interval);
  }, [request]);

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
    <Box position="relative">
      <Tabs value={tab} onChange={onChange}>
        <Tab disableRipple value="active" label="Active" />
        <Tab disableRipple value="inactive" label="Inactive" />
        {isLoading && (
          <Tab disabled style={{ minWidth: 'unset' }} icon={<CircularProgress size={20} />} />
        )}
      </Tabs>
      <List disablePadding>
        {job.map((jobType) => (
          <JobCard key={jobType.jobId} jobType={jobType} onAbort={onAbort} />
        ))}
      </List>
    </Box>
  );
};

export default JobList;
