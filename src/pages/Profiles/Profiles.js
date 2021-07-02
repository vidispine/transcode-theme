import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { shapetag as ShapetagApi } from '@vidispine/vdt-api';
import { Box, TableRow, TableCell, Checkbox, Button } from '@material-ui/core';
import { SearchInput } from '@vidispine/vdt-materialui';
import { useProfiles, useGetProfile } from './ProfileContext';
import { useDialog } from '../../components';
import ProfileManager from './ProfileManager';
import ProfileCard from '../Search/ProfileCard';

export const Profile = ({ profile: tagName }) => {
  const { data = {} } = useGetProfile({ tagName });
  const { name, format, resolution, videoCodec, bitrate, audioCodec, framerate } = data;
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{format}</TableCell>
      <TableCell>{resolution}</TableCell>
      <TableCell>{framerate}</TableCell>
      <TableCell>{videoCodec}</TableCell>
      <TableCell>{audioCodec}</TableCell>
      <TableCell>{bitrate}</TableCell>
    </TableRow>
  );
};

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
    <Box>
      <Box display="grid" gridTemplateColumns="1fr auto" gridGap={8}>
        <SearchInput onSubmit={onSearch} />
        <Button variant="contained" color="primary" style={{ flexShrink: 0 }} onClick={onClick}>
          Add new profile
        </Button>
      </Box>
      <Button type="button" onClick={prevPage} disabled={first === 0}>
        Prev
      </Button>
      <Button type="button" onClick={nextPage} disabled={first + 20 > profiles.length}>
        Next
      </Button>
      {profiles.slice(first, first + 20).map((tagName) => (
        <ProfileCard tagName={tagName} />
      ))}
      {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Format</TableCell>
            <TableCell>Resolution</TableCell>
            <TableCell>Framerate</TableCell>
            <TableCell>Video codec</TableCell>
            <TableCell>Audio codec</TableCell>
            <TableCell>Bitrate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.slice(first, first + 20).map((profile) => (
            <Profile profile={profile} key={profile} />
          ))}
        </TableBody>
      </Table> */}
    </Box>
  );
};
