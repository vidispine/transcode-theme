import React, { useState } from 'react';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Checkbox,
  Button,
} from '@material-ui/core';
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
  const [first, setFirst] = useState(0);
  const { profiles = [], onSearch } = useProfiles();

  const nextPage = () => {
    setFirst(first + 20);
  };
  const prevPage = () => {
    setFirst(Math.max(0, first - 20));
  };
  console.log('First: ', first, 'Length:', profiles.length);
  return (
    <Box height={500}>
      <SearchInput onSubmit={onSearch} />
      <Button type="button" onClick={prevPage} disabled={first === 0}>
        Prev
      </Button>
      <Button type="button" onClick={nextPage} disabled={first + 20 > profiles.length}>
        Next
      </Button>
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
          {profiles.slice(first, first + 20).map((profile) => (
            <Profile profile={profile} key={profile} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
