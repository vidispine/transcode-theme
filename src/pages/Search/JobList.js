import React from 'react';
import {
  List,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  CircularProgress,
  // List,
  // ListItem,
  // Snackbar,
} from '@material-ui/core';
// import MuiAlert from '@material-ui/lab/Alert';
import { job as JobApi } from '@vidispine/vdt-api';
import { useApi } from '@vidispine/vdt-react';

import JobCard from './JobCard';

const JobList = () => {
  const { request, data: { job = [] } = {}, isLoading } = useApi(JobApi.listJob);
  React.useEffect(() => {
    request({ queryParams: { step: true, type: 'RAW_IMPORT,PLACEHOLDER_IMPORT' } });
  }, [request]);
  // const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  // const [abortDialogOpen, setAbortDialogOpen] = React.useState(false);
  // const [snackbarMessage, setSnackbarMessage] = React.useState('');
  // const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
  // const [jobToAbort, setJobToAbort] = React.useState();
  //
  //
  // const checkAbortJob = (jobId) => {
  //   setAbortDialogOpen(true);
  //   setJobToAbort(jobId);
  // };
  //
  // const abortJob = () => {
  //   JobApi.abortJob({ jobId: jobToAbort })
  //     .then(() => {
  //       setSnackbarSeverity('info');
  //       setSnackbarMessage('Job aborted');
  //       setSnackbarOpen(true);
  //       setAbortDialogOpen(false);
  //     })
  //     .catch(() => {
  //       setSnackbarSeverity('error');
  //       setSnackbarMessage('Failed to abort job!');
  //       setSnackbarOpen(true);
  //       setAbortDialogOpen(false);
  //     });
  // };
  //
  // const onSnackbarClose = () => {
  //   setSnackbarOpen(false);
  // };

  return (
    <List>
      {isLoading && <CircularProgress />}
      {job.map((jobType) => (
        <JobCard jobType={jobType} />
      ))}
    </List>
  );

  // return jobs.map(({ jobId, type, status, log = {} }) => (
  //   <Card key={jobId} classes={{ root: classes.root }} variant="outlined">
  //     <CardHeader
  //       avatar={<Avatar>j</Avatar>}
  //       action={
  //         <IconButton>
  //           {RUNNING_STATES.includes(status) && <Pause />}
  //           {INACTIVE_STATES.includes(status) && <Info />}
  //         </IconButton>
  //       }
  //       title={type}
  //       subheader={jobId}
  //     />
  //     <Divider />
  //     <CardContent classes={{ root: classes.content }}>
  //       <span>{status}</span>
  //       <LinearProgress variant="determinate" value={getJobPercentage(log)} />
  //     </CardContent>
  //   </Card>
  // ));

  // return (
  //   <Card>
  //     <List>
  //       {jobs.map((job) => (
  //         <ListItem key={job.jobId}>
  //           <h2>Job {job.jobId}</h2>
  //           {!STOPPED_STATES.includes(job.status) && (
  //             <Button onClick={() => checkAbortJob(job.jobId)}>Abort</Button>
  //           )}
  //           <LinearProgress variant="determinate" value={getJobPercentage(job)} />
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Dialog
  //       open={abortDialogOpen}
  //       onClose={() => {
  //         setJobToAbort(undefined);
  //       }}
  //     >
  //       <DialogTitle id="max-width-dialog-title">Abort job</DialogTitle>
  //       <DialogContent>Are you sure you want to abort the job?</DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setAbortDialogOpen(false)} color="primary">
  //           Close
  //         </Button>
  //         <Button onClick={abortJob} color="primary">
  //           Yes
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //     <Snackbar
  //       severity={snackbarSeverity}
  //       autoHideDuration={5000}
  //       open={snackbarOpen}
  //       onClose={onSnackbarClose}
  //     >
  //       <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
  //     </Snackbar>
  //   </Card>
  // );
};

export default JobList;
