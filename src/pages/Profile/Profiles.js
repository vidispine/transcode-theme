import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { SwitchField } from '@vidispine/vdt-materialui';
import { Box, Button } from '@material-ui/core';
import { Search } from '../../components';
import { useDialog } from '../../context';
import {
  useListProfiles,
  useUpdateProfile,
  useCreateProfile,
  useDeleteProfile,
} from '../../hooks/profile';
import ProfileManager from './ProfileManager';
import ProfileCard from './ProfileCard';

export default () => {
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const [first, setFirst] = useState(0);
  const { data: allProfiles = [] } = useListProfiles();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const { mutateAsync: createProfile } = useCreateProfile();
  const { mutateAsync: deleteProfile } = useDeleteProfile();

  const [search, setSearch] = React.useState('');
  const [showDefault, setShowDefault] = React.useState(false);
  const onSearch = (v) => setSearch(v);
  const profiles = React.useMemo(() => {
    let tags = allProfiles;
    if (!showDefault) tags = tags.filter((tag) => !tag.startsWith('__'));
    if (search) tags = tags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return tags;
  }, [allProfiles, showDefault, search]);

  const nextPage = () => {
    setFirst(first + 20);
  };
  const prevPage = () => {
    setFirst(Math.max(0, first - 20));
  };

  const onDelete = (tagName) =>
    showDialog({
      title: 'Delete profile',
      message: 'Are you sure you want to delete this transcode profile?',
      okText: 'Yes, delete profile',
      noText: 'No, cancel',
    })
      .then(() =>
        deleteProfile({ tagName })
          .then(() => enqueueSnackbar('Profile deleted'))
          .catch(({ message }) => enqueueSnackbar(message, { variant: 'error' })),
      )
      .catch(() => null);
  const onCreate = () =>
    showDialog({ Dialog: ProfileManager })
      .then((transcodePresetDocument) => {
        const { name: tagName } = transcodePresetDocument;
        return createProfile({ tagName, transcodePresetDocument });
      })
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));
  const onChange = (profile) =>
    showDialog({ Dialog: ProfileManager, profile, okText: 'Save profile' })
      .then((transcodePresetDocument) => {
        const { name: tagName } = transcodePresetDocument;
        return updateProfile({ tagName, transcodePresetDocument });
      })
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));

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
