import React from 'react';
import { item as ItemApi, vidinet as VidinetApi, vsimport as ImportApi } from '@vidispine/vdt-api';
import {
  withStyles,
  Box,
  List,
  TextField,
  Collapse,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useProfiles } from '../Profiles/ProfileContext';
import ProfileCard from './ProfileCard';
import FileCard from './FileCard';
import { Search } from '../../components';

const styles = ({ palette, spacing }) => ({
  root: {
    position: 'relative',
    padding: spacing(2),
    backgroundColor: palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '& ul': {
      overflow: 'auto',
    },
    '& .MuiCollapse-container': {
      overflow: 'auto',
    },
  },
});

const useCostEstimate = (endpoint) => {
  const ref = React.useRef({});
  const [cost, setCost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const request = ({ tag: tags = [], ...params }) => {
    setIsLoading(true);
    if (!tags.length) return;
    const promises = tags.map(
      (tag) =>
        new Promise((resolve, reject) => {
          if (cost[tag]) resolve({ tag, ...cost[tag] });
          else {
            endpoint({ ...params, queryParams: { tag }, costEstimate: true })
              .then(({ data: { id: costEstimateId } = {} }) => {
                const poll = () => {
                  VidinetApi.getCostEstimate({ costEstimateId }).then(({ data }) => {
                    const { state, service: [service] = [{}] } = data;
                    if (state === 'FINISHED') resolve({ ...service, tag });
                    else ref.current[tag] = setTimeout(() => poll(), 1000);
                  });
                };
                poll();
              })
              .catch(reject);
          }
        }),
    );

    Promise.all(promises).then((response) => {
      const estimates = response.reduce(
        (acc, { tag, ...rest }) => ({ ...acc, [tag]: { ...rest } }),
        {},
      );
      setIsLoading(false);
      setCost(estimates);
    });
  };
  return { request, data: cost, isLoading };
};

const CostEstimate = ({ tag, itemId }) => {
  const { data = {}, request, isLoading } = useCostEstimate(ItemApi.createTranscode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => request({ itemId, tag }), [tag]);
  if (isLoading) return <CircularProgress />;
  return Object.entries(data).map(([key, { cost = {} }]) => (
    <Box p={2} borderRadius={4} bgcolor="background.paper" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between">
        <Typography color="textPrimary" variant="body1">
          {key}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          ${cost.value}
        </Typography>
      </Box>
      <TextField fullWidth disabled placeholder="Output filename..." />
    </Box>
  ));
};

const TranscodeDialog = ({ open, onSuccess, onClose, item, classes }) => {
  const { id: itemId } = item;
  const { profiles: allProfiles = [] } = useProfiles();
  const [step, setStep] = React.useState(1);
  const [checked, setChecked] = React.useState([]);
  const onChange = (tagName) => {
    if (checked.includes(tagName)) {
      setChecked([]);
      // setChecked((old) => old.filter((name) => name !== tagName));
    } else {
      setChecked([tagName]);
      // setChecked((old) => [...old, tagName]);
    }
  };
  const [search, setSearch] = React.useState('');
  const profiles = React.useMemo(
    () =>
      allProfiles
        .filter((name) => name.toLowerCase().includes(search))
        .sort((a, b) => {
          if (checked.includes(a)) return -1;
          if (checked.includes(b)) return 1;
          return 0;
        }),
    // eslint-disable-next-line
    [search, allProfiles],
  );

  const handleTranscode = () => {
    const transcodes = checked.map((tag) => {
      return ImportApi.createImportPlaceholder({
        metadataDocument: {},
        queryParams: { container: 1 },
      })
        .then(({ data: { id: destinationItem } = {} }) =>
          ItemApi.createTranscode({ itemId, queryParams: { tag, destinationItem } }),
        )
        .catch(() => null);
    });
    Promise.all(transcodes).then(onSuccess).catch(onClose);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Transcode file</DialogTitle>
      <DialogContent classes={classes}>
        <FileCard itemType={item} interactive={false} />
        <Collapse in={step === 1}>
          <div>
            <Search onChange={setSearch} />
            <List disablePadding>
              {profiles.map((tagName) => (
                <ProfileCard
                  key={tagName}
                  checked={checked.includes(tagName)}
                  tagName={tagName}
                  onChange={onChange}
                />
              ))}
            </List>
          </div>
        </Collapse>
        <Collapse in={step === 2}>
          <div>
            <CostEstimate tag={checked} itemId={itemId} />
          </div>
        </Collapse>
      </DialogContent>
      <DialogActions>
        {step === 1 && (
          <>
            {checked.length > 0 && (
              <Typography style={{ marginRight: 'auto' }}>
                {checked.length} profiles selected
              </Typography>
            )}
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={() => setStep(2)}>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Button onClick={() => setStep(1)}>Back</Button>
            <Button variant="contained" color="primary" onClick={handleTranscode}>
              Start transcoding
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(TranscodeDialog);
