import React from 'react';
import {
  item as ItemApi,
  vidinet as VidinetApi,
  vsimport as ImportApi,
  shape as ShapeApi,
} from '@vidispine/vdt-api';
import { createMetadataType, parseMetadataType } from '@vidispine/vdt-js';
import { Form, Field } from 'react-final-form';
import {
  withStyles,
  Box,
  List,
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
import { Search, TextField } from '../../components';

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
      position: 'relative',
    },
  },
});

const useCostEstimate = (endpoint) => {
  const ref = React.useRef({});
  const cancel = React.useRef(null);
  const [cost, setCost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const request = React.useCallback(
    ({ tag: tags = [], ...params }) => {
      if (!tags.length) return;
      if (cancel.current) {
        cancel.current({ canceled: true });
        cancel.current = null;
      } else {
        setIsLoading(true);
      }
      const promise = new Promise((resolve, reject) => {
        const promises = tags.map(
          ({ name: tag }) =>
            new Promise((res, rej) => {
              if (cost[tag]) {
                res({ tag, ...cost[tag] });
              } else {
                endpoint({ ...params, queryParams: { tag }, costEstimate: true })
                  .then(({ data: { id: costEstimateId } = {} }) => {
                    const poll = () => {
                      VidinetApi.getCostEstimate({ costEstimateId }).then(({ data }) => {
                        const { state, service: [service] = [{}] } = data;
                        if (state === 'FINISHED') res({ ...service, tag });
                        else ref.current[tag] = setTimeout(() => poll(), 1000);
                      });
                    };
                    poll();
                  })
                  .catch(rej);
              }
            }),
        );
        Promise.all(promises).then(resolve).catch(reject);
      });
      const cancelPromise = new Promise((_, reject) => {
        cancel.current = reject;
      });
      Promise.race([promise, cancelPromise])
        .then((res) => {
          const estimates = res.reduce((a, { tag, ...c }) => ({ ...a, [tag]: { ...c } }), {});
          setIsLoading(false);
          setCost(estimates);
          cancel.current = null;
        })
        .catch(({ canceled }) => {
          if (!canceled) {
            setIsLoading(false);
            cancel.current = null;
          }
        });
    },
    [endpoint, cost],
  );
  return { request, isLoading, data: cost };
};

const CostEstimate = ({ selected, cost: data, title, isLoading }) => {
  const [[initialValue]] = React.useState(title.split('.'));
  return (
    <Box width={1}>
      {selected.map(({ name, createPreview, createThumbnails }) => (
        <Box
          key={name}
          p={2}
          borderRadius={4}
          bgcolor="background.paper"
          display="flex"
          flexDirection="column"
        >
          <Box mb={1} px={2} display="flex" justifyContent="space-between">
            <Typography color="textPrimary" variant="body1">
              {name}
            </Typography>
            {isLoading ? (
              <CircularProgress size={16} />
            ) : (
              <Typography color="textSecondary" variant="body1">
                ${data[name] && data[name].cost.value}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            name={`${name}.name`}
            placeholder={title}
            initialValue={initialValue}
          />
          <Field
            name={`${name}.createPreview`}
            initialValue={!!createPreview}
            render={() => null}
          />
          <Field
            name={`${name}.createThumbnails`}
            initialValue={!!createThumbnails}
            render={() => null}
          />
        </Box>
      ))}
      <Box mt={2} px={2} display="flex" justifyContent="space-between">
        <Typography color="textPrimary" variant="h5">
          Total:
        </Typography>
        <Typography color="textSecondary" variant="h5">
          {isLoading ? (
            <CircularProgress />
          ) : (
            `$${Object.values(data).reduce((a, { cost = {} }) => a + cost.value, 0)}`
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const Content = ({ onClose, profiles: allProfiles, item, classes, handleSubmit }) => {
  const { metadata = {} } = item;
  const { itemId, title } = parseMetadataType(metadata, { flat: true, arrayOnSingle: false });
  const [step, setStep] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const profiles = React.useMemo(
    () => allProfiles.filter((name) => name.toLowerCase().includes(search) && name !== 'original'),
    [search, allProfiles],
  );
  const [selected, setSelected] = React.useState([]);
  const toggleSelected = (payload) => {
    const { name: tagName } = payload;
    const filter = selected.filter(({ name }) => name !== tagName);
    if (filter.length === selected.length) return setSelected([...filter, payload]);
    return setSelected(filter);
  };

  const toggleStep = () =>
    setStep((oldStep) => {
      setStep(0);
      setTimeout(() => setStep(oldStep === 1 ? 2 : 1), 500);
    });

  const { data: cost = {}, request, isLoading } = useCostEstimate(ItemApi.createTranscode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => request({ itemId, tag: selected }), [selected, itemId]);

  return (
    <>
      <DialogContent classes={classes}>
        <FileCard itemType={item} interactive={false} />
        <Box overflow="hidden" flexGrow={1} display="flex" flexDirection="column">
          <Collapse in={step === 1} timeout={500}>
            <Search fixed onChange={setSearch} placeholder="Search profiles..." />
            <Box mt={2}>
              <List disablePadding>
                {profiles.map((tagName) => (
                  <ProfileCard
                    key={tagName}
                    tagName={tagName}
                    selected={selected.some(({ name }) => name === tagName)}
                    onChange={toggleSelected}
                  />
                ))}
              </List>
            </Box>
          </Collapse>
          <Collapse in={step === 2} timeout={500}>
            <form onSubmit={handleSubmit}>
              <CostEstimate selected={selected} cost={cost} title={title} isLoading={isLoading} />
            </form>
          </Collapse>
        </Box>
      </DialogContent>
      <DialogActions>
        {step === 1 && <Button onClick={onClose}>Cancel</Button>}
        <Button
          disabled={!selected.length}
          variant={step === 1 ? 'contained' : 'text'}
          color={step === 1 ? 'primary' : 'default'}
          onClick={toggleStep}
        >
          {step === 1 ? 'Next' : 'Back'}
        </Button>
        {step === 2 && (
          <Button disabled={isLoading} variant="contained" color="primary" onClick={handleSubmit}>
            Start transcode
          </Button>
        )}
      </DialogActions>
    </>
  );
};

const TranscodeDialog = ({ open, onSuccess, onClose, item = {}, classes }) => {
  const { shape: [shapeDocument = {}] = [{}], id: itemId } = item;
  const { profiles: allProfiles = [] } = useProfiles();
  const handleSubmit = (values) => {
    const queryParams = { container: 1 };
    const promises = Object.entries(values).map(([tag, params]) => {
      const { createThumbnails = false, name: title } = params;
      const metadataDocument = createMetadataType({ title });
      return ImportApi.createImportPlaceholder({ metadataDocument, queryParams }).then(
        ({ data: { id: destinationItem } = {} }) =>
          ShapeApi.removeShapeAll({ itemId: destinationItem }).then(() =>
            ShapeApi.createShape({ itemId: destinationItem, shapeDocument })
              .then(() =>
                ItemApi.createTranscode({
                  itemId,
                  queryParams: { tag, destinationItem, createThumbnails },
                }).catch(() => ItemApi.removeItem({ itemId: destinationItem })),
              )
              .catch(() => ItemApi.removeItem({ itemId: destinationItem })),
          ),
      );
    });
    Promise.all(promises)
      .then(onSuccess)
      .catch(() => onClose({ message: 'Failed to start transcode' }));
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Transcode file</DialogTitle>
      <Form
        item={item}
        render={Content}
        onClose={onClose}
        classes={classes}
        profiles={allProfiles}
        onSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default withStyles(styles)(TranscodeDialog);
