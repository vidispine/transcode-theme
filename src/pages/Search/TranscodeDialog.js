/* eslint-disable no-unused-vars */
import React from 'react';

import {
  withStyles,
  Box,
  Collapse,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import { useQueryClient } from 'react-query';

import { item as ItemApi, vsimport as ImportApi, shape as ShapeApi } from '@vidispine/vdt-api';
import { createMetadataType, parseMetadataType } from '@vidispine/vdt-js';
import { SwitchField } from '@vidispine/vdt-materialui';

import { Search, TextField } from '../../components';
import { useCostEstimate } from '../../hooks';
import { useListProfiles } from '../../hooks/profile';
import { useGetStorages } from '../../hooks/storage';
import ProfileCard from '../Profile/ProfileCard';

import FileCard from './FileCard';

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

function CostEstimate({ selected, cost: data, title, isLoading }) {
  const [[initialValue]] = React.useState(title.split('.'));
  return (
    <Box width={1}>
      {selected.map(({ name: tagName, format, createPreview, createThumbnails }) => (
        <Box
          key={tagName}
          p={2}
          borderRadius={4}
          bgcolor="background.paper"
          display="flex"
          flexDirection="column"
        >
          <Box mb={1} px={2} display="flex" justifyContent="space-between">
            <Typography color="textPrimary" variant="body1">
              {tagName}
            </Typography>
            {isLoading ? (
              <CircularProgress size={16} />
            ) : (
              <Typography color="textSecondary" variant="body1">
                ${data[tagName] && data[tagName].cost.value}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            name={`${tagName}.name`}
            placeholder={title}
            initialValue={initialValue}
          />
          <Field
            name={`${tagName}.createPreview`}
            initialValue={!!createPreview}
            render={() => null}
          />
          <Field
            name={`${tagName}.createThumbnails`}
            initialValue={!!createThumbnails}
            render={() => null}
          />
          <Field name={`${tagName}.format`} initialValue={format} render={() => null} />
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
}

function Content({
  onClose,
  profiles: allProfiles,
  item,
  classes,
  handleSubmit,
  submitting,
  selected,
  toggleSelected,
}) {
  const { metadata = {} } = item;
  const { itemId, title } = parseMetadataType(metadata, { flat: true, arrayOnSingleValue: false });
  const [step, setStep] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [showDefault, setShowDefault] = React.useState(false);
  const profiles = React.useMemo(() => {
    let tags = allProfiles;
    if (!showDefault) tags = tags.filter((tag) => !tag.startsWith('__'));
    if (search) tags = tags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return tags;
  }, [allProfiles, showDefault, search]);

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
            <Box
              display="flex"
              flexDirection="column"
              position="sticky"
              top={0}
              zIndex={10}
              bgcolor="background.default"
            >
              <Search onChange={setSearch} placeholder="Search profiles..." />
              <SwitchField
                SwitchProps={{ color: 'primary' }}
                label="Show default profiles"
                input={{
                  value: showDefault,
                  onChange: ({ target }) => setShowDefault(target.checked),
                }}
              />
            </Box>
            <Box mt={1}>
              {profiles.map((tagName) => (
                <ProfileCard
                  key={tagName}
                  tagName={tagName}
                  selected={selected.some(({ name }) => name === tagName)}
                  onSelect={toggleSelected}
                />
              ))}
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
          <Button
            disabled={isLoading || submitting}
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleSubmit}
          >
            Start transcode
          </Button>
        )}
      </DialogActions>
    </>
  );
}

function TranscodeDialog({ open, onSuccess, onClose, item = {}, classes }) {
  const { shape: [shapeDocument = {}] = [{}], id: itemId } = item;
  const { data: { output = {} } = {}, isLoading } = useGetStorages();
  const { storageId } = output;
  const { data: allProfiles = [] } = useListProfiles();

  const [selected, setSelected] = React.useState([]);
  const toggleSelected = (payload) => {
    const { name: tagName } = payload;
    const filter = selected.filter(({ name }) => name !== tagName);
    if (filter.length === selected.length) return setSelected([...filter, payload]);
    return setSelected(filter);
  };
  const queryClient = useQueryClient();

  const handleSubmit = (values) => {
    const queryParams = { container: 1 };
    // Temp fix for not starting transcodes on non selected tags
    const tags = Object.entries(values).filter(([tagName]) =>
      selected.some((tag) => tagName === tag.name),
    );
    const promises = tags.map(
      ([tag, params]) =>
        new Promise((res) => {
          const resolve = () => res({ tag });
          const reject = ({ message: error }) => res({ tag, error });
          const { createThumbnails = false, name: title, format } = params;
          const metadataDocument = createMetadataType({ title });
          ImportApi.createImportPlaceholder({ metadataDocument, queryParams })
            .then(({ data: { id: destinationItem } = {} }) =>
              ShapeApi.removeShapeAll({ itemId: destinationItem })
                .then(() =>
                  ShapeApi.createShape({ itemId: destinationItem, shapeDocument })
                    .then(() =>
                      ItemApi.createTranscode({
                        itemId,
                        queryParams: {
                          tag,
                          destinationItem,
                          createThumbnails,
                          storageId,
                          jobmetadata: [{ key: 'filename', value: `${title}.${format}` }],
                        },
                      })
                        .then(resolve)
                        .catch((err) =>
                          ItemApi.removeItem({ itemId: destinationItem }).then(() => reject(err)),
                        ),
                    )
                    .catch((err) =>
                      ItemApi.removeItem({ itemId: destinationItem }).then(() => reject(err)),
                    ),
                )
                .catch((err) =>
                  ItemApi.removeItem({ itemId: destinationItem }).then(() => reject(err)),
                ),
            )
            .then(setTimeout(() => queryClient.invalidateQueries('getJobs'), 2000))
            .catch(reject);
        }),
    );
    return Promise.all(promises).then(onSuccess);
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
        selected={selected}
        toggleSelected={toggleSelected}
      />
    </Dialog>
  );
}

export default withStyles(styles)(TranscodeDialog);
