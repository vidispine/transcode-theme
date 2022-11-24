import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import JsonTreeView from '../../components/JsonTreeView';

const styles = () => ({
  root: {},
});

function JobDialog({ onClose, open, classes, jobType }) {
  const { jobId } = jobType;
  return (
    <Dialog classes={{ root: classes.root }} fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle classes={{ root: classes.title }}>{jobId}</DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        <JsonTreeView data={jobType} />
      </DialogContent>
      <DialogActions classes={{ root: classes.actions }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(JobDialog);
