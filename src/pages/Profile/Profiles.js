import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { shapetag as ShapetagApi } from '@vidispine/vdt-api';
import { SwitchField } from '@vidispine/vdt-materialui';
import { Box, Button } from '@material-ui/core';
import { Search } from '../../components';
import { useDialog, useProfiles } from '../../context';
import ProfileManager from './ProfileManager';
import ProfileCard from './ProfileCard';

export default () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [first, setFirst] = useState(0);
  const { profiles = [], onSearch, onRefresh, showDefault, setShowDefault } = useProfiles();

  const nextPage = () => {
    setFirst(first + 20);
  };
  const prevPage = () => {
    setFirst(Math.max(0, first - 20));
  };

  const onDelete = (tagName) =>
    ShapetagApi.removeShapeTag({ tagName })
      .then(() => enqueueSnackbar('Success'))
      .catch(({ message }) => enqueueSnackbar(message, { variant: 'error' }))
      .then(onRefresh);
  const onCreate = () =>
    showDialog({ Dialog: ProfileManager })
      .then((transcodePresetDocument) => {
        const { name: tagName } = transcodePresetDocument;
        return ShapetagApi.updateShapeTag({ tagName, transcodePresetDocument });
      })
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }))
      .then(onRefresh);
  const onChange = (profile) =>
    showDialog({ Dialog: ProfileManager, profile, okText: 'Save profile' })
      .then((transcodePresetDocument) => {
        const { name: tagName } = transcodePresetDocument;
        return ShapetagApi.updateShapeTag({ tagName, transcodePresetDocument });
      })
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }))
      .then(onRefresh);
  return (
    <Box height={1} display="flex" flexDirection="column">
      <Box display="grid" gridTemplateColumns="1fr auto" gridGap={8}>
        <Search onChange={onSearch} placeholder="Search profiles..." />
        <Button
          variant="contained"
          color="primary"
          style={{ flexShrink: 0 }}
          onClick={onCreate}
          disableElevation
        >
          Add new profile
        </Button>
        <SwitchField
          color="primary"
          label="Show default profiles"
          input={{ value: showDefault, onChange: ({ target }) => setShowDefault(target.checked) }}
        />
      </Box>
      <Box my={2} flexGrow={1} overflow="auto">
        {profiles.slice(first, first + 20).map((tagName) => (
          <ProfileCard
            key={tagName}
            tagName={tagName}
            onDelete={onDelete}
            onChange={onChange}
            checkbox={false}
            interactive
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button type="button" onClick={prevPage} disabled={first === 0}>
          Prev
        </Button>
        <Button type="button" onClick={nextPage} disabled={first + 20 > profiles.length}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
