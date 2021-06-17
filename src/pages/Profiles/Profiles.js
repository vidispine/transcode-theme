import React from 'react';
import { Box, Table, TableRow, TableBody, TableHead, TableCell, Checkbox } from '@material-ui/core';
import { SearchInput } from '@vidispine/vdt-materialui';
import { useProfiles, useGetProfile } from './ProfileContext';

export const Profile = ({ profile: tagName }) => {
  const { data = {} } = useGetProfile({ tagName });
  console.log(data);
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
  const { profiles = [], onSearch } = useProfiles();
  return (
    <Box height={500}>
      <SearchInput onSubmit={onSearch} />
      <Table>
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
          {profiles.map((profile) => (
            <Profile profile={profile} key={profile} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
