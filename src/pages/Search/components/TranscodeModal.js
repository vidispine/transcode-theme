import React, { useState } from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';
import parseFileSize from 'filesize';
import Snackbar from '@material-ui/core/Snackbar';
import { item as ItemApi, file as FileApi } from '@vidispine/vdt-api';
import { useProfiles, useGetProfile } from '../../Profiles/ProfileContext';
import ShapeInfo from './ShapeInfo';
import useCost from '../../../hooks/useCost';
import { getMetadataFieldValue } from '../../../utils/utils';

export const Profile = ({ profile: tagName, toggleSelected }) => {
  const { data = {} } = useGetProfile({ tagName });
  const { name, resolution, videoCodec, bitrate, audioCodec } = data;
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          onChange={() => {
            toggleSelected(tagName);
          }}
        />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>Codec: {videoCodec}</TableCell>
      <TableCell>Audio codec: {audioCodec}</TableCell>
      <TableCell>Resolution: {resolution}</TableCell>
      <TableCell>Bitrate: {bitrate}</TableCell>
    </TableRow>
  );
};
const renderShapeInfo = (shape) => {
  if (!shape) {
    return <p>Technical metadata extraction not completed.</p>;
  }
  return <ShapeInfo file={{}} shape={shape} />;
};

const ProfilesStep = ({ item, profiles, toggleProfileSelected, costStep, close }) => {
  console.log('ITEM', item);
  return (
    <>
      <DialogContent>
        {item && (
          <MediaCardFullWidth
            className="search-result"
            title={getMetadataFieldValue(item.metadata, 'originalFilename')}
            subheader={parseFileSize(10000000)}
            ExpandComponent={false}
            content={renderShapeInfo(item.shape[0])}
            ContentProps={{ component: 'div' }}
            ActionsComponent={false}
          />
        )}
        <h2>Profiles</h2>
        <Table>
          <TableBody>
            {profiles.map((profile) => (
              <Profile profile={profile} key={profile} toggleSelected={toggleProfileSelected} />
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
        <Button onClick={costStep} color="primary">
          Next
        </Button>
      </DialogActions>
    </>
  );
};

const CostStep = ({ item, selectedProfiles, close, openSnackbar }) => {
  const { cost, getCost, isLoading } = useCost(ItemApi.createTranscode);
  React.useEffect(() => {
    getCost({ itemId: item.id, queryParams: { tag: selectedProfiles } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFileId = (it) => {
    if (!it.shape) {
      return null;
    }
    const shape = it.shape[0];
    let component;
    if (shape.containerComponent) {
      component = shape.containerComponent;
    } else if (shape.binaryComponent) {
      component = shape.binaryComponent;
    }
    return component.file[0].id;
  };

  const startJobs = () => {
    const requestPromises = [];
    selectedProfiles.forEach((tag) => {
      const queryParams = { tag, allowReimport: true };
      requestPromises.push(
        FileApi.createFileImport({ fileId: getFileId(item), metadataDocument: {}, queryParams }),
      );
    });
    Promise.all(requestPromises).then(() => {
      openSnackbar('Transcode jobs started!', 'info');
      close();
    });
  };

  return (
    <>
      <DialogContent>
        <h2>Calculate cost</h2>
        {selectedProfiles.map((profile) => {
          return (
            <p>
              {profile} {isLoading ? 'Loading...' : cost}
            </p>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
        <Button onClick={startJobs} color="primary">
          Start transcoding
        </Button>
      </DialogActions>
    </>
  );
};

const TranscodeModal = ({ open, item, handleClose }) => {
  const [step, setStep] = useState('PROFILES');
  const { profiles = [] } = useProfiles();
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const toggleProfileSelected = (profile) => {
    if (profile in selectedProfiles) {
      setSelectedProfiles(selectedProfiles.filter((e) => e !== profile));
    } else {
      setSelectedProfiles([...selectedProfiles, profile]);
    }
  };

  const openSnackbar = (message, severity) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const onSnackbarClose = () => {
    setSnackbarMessage('');
    setSnackbarSeverity('info');
    setSnackbarOpen(false);
  };

  const costStep = () => {
    if (selectedProfiles.length === 0) {
      openSnackbar('No profiles selected', 'error');
    } else {
      setStep('COST');
    }
  };

  const close = () => {
    handleClose();
  };

  return (
    <Dialog
      fullWidth={false}
      maxWidth="md"
      open={open}
      onClose={() => {}}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Transcode file {item ? item.id : ''}</DialogTitle>
      {step === 'PROFILES' && (
        <ProfilesStep
          item={item}
          profiles={profiles}
          toggleProfileSelected={toggleProfileSelected}
          costStep={costStep}
          close={close}
        />
      )}
      {step === 'COST' && (
        <CostStep
          item={item}
          selectedProfiles={selectedProfiles}
          openSnackbar={openSnackbar}
          close={close}
        />
      )}
      <Snackbar
        severity={snackbarSeverity}
        autoHideDuration={5000}
        open={snackbarOpen}
        onClose={onSnackbarClose}
      >
        <MuiAlert severity={snackbarSeverity}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default TranscodeModal;
