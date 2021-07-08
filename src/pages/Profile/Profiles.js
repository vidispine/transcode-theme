import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { shapetag as ShapetagApi } from '@vidispine/vdt-api';
import { Box, Button } from '@material-ui/core';
import { Search } from '../../components';
import { useDialog, useProfiles } from '../../context';
import ProfileManager from './ProfileManager';
import ProfileCard from './ProfileCard';

export default () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const onClick = () =>
    showDialog({ Dialog: ProfileManager })
      .then((transcodePresetDocument) => {
        const { name: tagName } = transcodePresetDocument;
        return ShapetagApi.updateShapeTag({ tagName, transcodePresetDocument });
      })
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));
  const [first, setFirst] = useState(0);
  const { profiles = [], onSearch } = useProfiles();

  const nextPage = () => {
    setFirst(first + 20);
  };
  const prevPage = () => {
    setFirst(Math.max(0, first - 20));
  };
  return (
    <Box px={2} pt={2} height={1} display="flex" flexDirection="column">
      <Box display="grid" gridTemplateColumns="1fr auto" gridGap={8}>
        <Search onChange={onSearch} />
        <Button variant="contained" color="primary" style={{ flexShrink: 0 }} onClick={onClick}>
          Add new profile
        </Button>
      </Box>
      <Box my={2} flexGrow={1} overflow="auto">
        {profiles.slice(first, first + 20).map((tagName) => (
          <ProfileCard key={tagName} tagName={tagName} />
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
