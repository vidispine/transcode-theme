import React from 'react';
import { MediaCardFullWidth } from '@vidispine/vdt-materialui';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Checkbox,
} from '@material-ui/core';
import parseFileSize from 'filesize';
import { useProfiles, useGetProfile } from '../../Profiles/ProfileContext';
import ShapeInfo from './ShapeInfo';

export const Profile = ({ profile: tagName }) => {
  const { data = {} } = useGetProfile({ tagName });
  const { name, resolution, videoCodec, bitrate, audioCodec } = data;
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>Codec: {videoCodec}</TableCell>
      <TableCell>Audio codec: {audioCodec}</TableCell>
      <TableCell>Resolution: {resolution}</TableCell>
      <TableCell>Bitrate: {bitrate}</TableCell>
    </TableRow>
  );
};
const renderShapeInfo = (fileInfo) => {
  if (!fileInfo.fileShape) {
    return <p>Technical metadata extraction not completed.</p>;
  }
  return <ShapeInfo file={fileInfo.file} shape={fileInfo.fileShape} />;
};

const TranscodeModal = ({ open, fileInfo, handleClose }) => {
  const { profiles = [] } = useProfiles();
  const nextStep = () => {};
  return (
    <Dialog
      fullWidth={false}
      maxWidth="md"
      open={open}
      onClose={() => {}}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Transcode file {fileInfo ? fileInfo.file.id : ''}
      </DialogTitle>
      <DialogContent>
        {fileInfo && (
          <MediaCardFullWidth
            className="search-result"
            title={fileInfo.file.path}
            subheader={parseFileSize(fileInfo.file.size)}
            ExpandComponent={false}
            content={renderShapeInfo(fileInfo)}
            ContentProps={{ component: 'div' }}
            ActionsComponent={false}
          />
        )}
        <h2>Profiles</h2>
        <Table>
          <TableBody>
            {profiles.map((profile) => (
              <Profile profile={profile} key={profile} />
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={nextStep} color="primary">
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranscodeModal;
