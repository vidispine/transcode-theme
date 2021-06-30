import React from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  List,
  ListItem,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { job as JobApi } from '@vidispine/vdt-api';

const STOPPED_STATES = ['FINISHED', 'FINISHED_WARNING', 'FAILED_TOTAL'];

const getJobPercentage = (job) => {
  const transcodeStep = job.log.task.find((s) => s.step === 100);
  if (!transcodeStep || !transcodeStep.progress) {
    return 0;
  }
  return transcodeStep.progress.value;
};

const JobList = () => {
  const [jobs, setJobs] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [abortDialogOpen, setAbortDialogOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
  const [jobToAbort, setJobToAbort] = React.useState();

  React.useEffect(() => {
    JobApi.listJob({ queryParams: { step: true, type: 'RAW_IMPORT,PLACEHOLDER_IMPORT' } }).then(
      (response) => {
        const { data } = response;
        setJobs(data.job);
      },
    );
  }, []);

  const checkAbortJob = (jobId) => {
    setAbortDialogOpen(true);
    setJobToAbort(jobId);
  };

  const abortJob = () => {
    JobApi.abortJob({ jobId: jobToAbort })
      .then(() => {
        setSnackbarSeverity('info');
        setSnackbarMessage('Job aborted');
        setSnackbarOpen(true);
        setAbortDialogOpen(false);
      })
      .catch(() => {
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to abort job!');
        setSnackbarOpen(true);
        setAbortDialogOpen(false);
      });
  };

  const onSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card>
      <List>
        {jobs.map((job) => (
          <ListItem key={job.jobId}>
            <h2>Job {job.jobId}</h2>
            {!STOPPED_STATES.includes(job.status) && (
              <Button onClick={() => checkAbortJob(job.jobId)}>Abort</Button>
            )}
            <LinearProgress variant="determinate" value={getJobPercentage(job)} />
          </ListItem>
        ))}
      </List>
      <Dialog
        open={abortDialogOpen}
        onClose={() => {
          setJobToAbort(undefined);
        }}
      >
        <DialogTitle id="max-width-dialog-title">Abort job</DialogTitle>
        <DialogContent>Are you sure you want to abort the job?</DialogContent>
        <DialogActions>
          <Button onClick={() => setAbortDialogOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={abortJob} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={snackbarOpen}
        onClose={onSnackbarClose}
      >
        <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default JobList;
