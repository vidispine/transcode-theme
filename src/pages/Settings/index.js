/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import {
  withStyles,
  Avatar,
  Box,
  Grid,
  Paper,
  Button,
  Tooltip,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { CheckCircle as Check, Error, Autorenew as Loading } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { Form } from 'react-final-form';

import { FieldSelector } from '../../components';
import { useGetStorages, useCreateStorage, useModifyStorage } from '../../hooks/storage';

import filenameScript from './filenameScript';
import form from './form';

const defaultValues = form
  .map(({ name, defaultValue }) => {
    return { [name]: defaultValue || '' };
  })
  .reduce((acc, item) => ({ ...acc, ...item }), {});

const styles = ({ spacing, palette, transitions }) => ({
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(180deg)',
    },
  },
  root: {
    '& button:not(:last-child)': {
      marginRight: spacing(2),
    },
    '& .MuiSvgIcon-root.success': {
      fill: palette.success.main,
    },
    '& .MuiSvgIcon-root.loading': {
      animation: `$spin 1500ms ${transitions.easing.easeInOut} infinite`,
    },
  },
  storageList: {
    display: 'flex',
  },
  storageListItem: {
    '& .MuiListItemText-root': {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
});

const StorageForm = withStyles(styles)(
  ({
    classes,
    name,
    id,
    fields,
    form: ref,
    pristine,
    handleSubmit,
    isEditing,
    setIsEditing,
    bucketName,
    bucketPath,
  }) => {
    const reset = () => {
      ref.setConfig('keepDirtyOnReinitialize', false);
      ref.reset();
      ref.setConfig('keepDirtyOnReinitialize', true);
      if (id) setIsEditing(false);
    };
    return (
      <form onSubmit={handleSubmit}>
        {isEditing || !id ? (
          <Box p={2}>
            <Grid spacing={2} container>
              {fields.map(({ name: fieldName, fullWidth, ...props }) => (
                <Grid key={fieldName} item xs={fullWidth ? 12 : 6}>
                  <FieldSelector disabled={!isEditing} name={`${name}.${fieldName}`} {...props} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box p={2}>
            <List className={classes.storageList}>
              <ListItem className={classes.storageListItem}>
                <ListItemText
                  primary={bucketName}
                  secondary="Bucket name"
                  primaryTypographyProps={{
                    variant: 'body1',
                  }}
                />
              </ListItem>
              <ListItem className={classes.storageListItem}>
                <ListItemText
                  primary={bucketPath}
                  secondary="Bucket path"
                  primaryTypographyProps={{
                    variant: 'body1',
                  }}
                />
              </ListItem>
            </List>
          </Box>
        )}
        <Box p={2} display="flex" justifyContent="flex-end">
          {id && !isEditing && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          {isEditing && (
            <Button disabled={!id && pristine} onClick={reset}>
              {!id ? 'Reset' : 'Cancel'}
            </Button>
          )}
          {isEditing && (
            <Button
              disabled={pristine}
              variant="contained"
              color="primary"
              type="submit"
              disableElevation
            >
              Save
            </Button>
          )}
        </Box>
      </form>
    );
  },
);

const StorageSection = withStyles(styles)(
  ({ classes, fields, name, storage = {}, updating, initialValues, onUpdateStorage }) => {
    const {
      id,
      protocol,
      lastSuccess = 1971,
      lastFailure = 1970,
      failureMessage,
      name: bucketName,
      path: bucketPath,
    } = storage;

    const { enqueueSnackbar } = useSnackbar();

    const error = new Date(lastSuccess) - new Date(lastFailure) < 0;
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    const [isEditing, setIsEditing] = React.useState(!id);

    React.useEffect(() => {
      if (!id) setIsEditing(true);
    }, [id]);

    const leSubmitFunction = (values) =>
      onUpdateStorage(values)
        .then(() => {
          enqueueSnackbar('Success!', { variant: 'success' });
          setIsEditing(false);
        })
        .catch(() => {
          enqueueSnackbar('Failed', { variant: 'error' });
        });
    return (
      <Paper className={classes.root}>
        <Box
          p={2}
          display="grid"
          gridTemplateColumns="auto 1fr auto"
          gridGap={16}
          alignItems="center"
        >
          {protocol && <Avatar>{protocol}</Avatar>}
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">{title}</Typography>
            {!id && <Typography variant="caption">{title} not configured</Typography>}
          </Box>
          {id && updating && (
            <Tooltip title="Waiting for status to update">
              <Loading className="loading" />
            </Tooltip>
          )}
          {id && error && !updating && (
            <Tooltip title={failureMessage}>
              <Error color="error" />
            </Tooltip>
          )}
          {id && !error && !updating && <Check className="success" />}
        </Box>
        <Form
          fields={fields}
          name={name}
          id={id}
          component={StorageForm}
          initialValues={initialValues}
          onSubmit={leSubmitFunction}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          bucketName={bucketName}
          bucketPath={bucketPath}
          subscription={{ pristine: true, submitting: true }}
          keepDirtyOnReinitialize
        />
      </Paper>
    );
  },
);

function Settings() {
  const [refetchInterval, setRefetchInterval] = React.useState(false);
  const { data: { input = {}, output = {} } = {}, isLoading } = useGetStorages({
    refetchInterval,
  });

  const updatingInput = React.useMemo(() => {
    const {
      lastSuccess = 1971,
      lastFailure = 1970,
      metadata: { field: methodMetadataFields = [] } = {},
    } = input;
    const { value: lastModified } = methodMetadataFields.length
      ? methodMetadataFields.find(({ key }) => key === 'lastModified')
      : {};
    return lastModified
      ? new Date(lastSuccess) - new Date(lastModified) < 0 &&
          new Date(lastFailure) - new Date(lastModified) < 0
      : false;
  }, [input]);

  const updatingOutput = React.useMemo(() => {
    const {
      lastSuccess = 1971,
      lastFailure = 1970,
      metadata: { field: methodMetadataFields = [] } = {},
    } = output;
    const { value: lastModified } = methodMetadataFields.length
      ? methodMetadataFields.find(({ key }) => key === 'lastModified')
      : {};
    return lastModified
      ? new Date(lastSuccess) - new Date(lastModified) < 0 &&
          new Date(lastFailure) - new Date(lastModified) < 0
      : false;
  }, [output]);

  React.useEffect(() => {
    setRefetchInterval(updatingInput || updatingOutput ? 5000 : false);
  }, [updatingInput, updatingOutput]);

  const { mutateAsync: modifyStorage } = useModifyStorage();
  const { mutateAsync: createStorage } = useCreateStorage();

  const onUpdateStorage = ({ input: inputStorage, output: outputStorage }) => {
    const {
      protocol,
      accessKey,
      secretKey,
      name,
      path,
      // region,
      id: storageMethodId,
      storageId,
    } = {
      ...inputStorage,
      ...outputStorage,
    };

    let uri = `${protocol}://${accessKey}:${secretKey}@${name}/${path}`;
    if (uri.charAt(uri.length - 1) !== '/') uri = uri.concat('/');
    const encodedAccessKey = encodeURIComponent(accessKey);
    const encodedSecretKey = encodeURIComponent(secretKey);
    const encodedUri = `${protocol}://${encodedAccessKey}:${encodedSecretKey}@${name}/${path}`;
    if (storageId) {
      const storageDocument = {
        type: 'LOCAL',
        capacity: 800000000000,
        method: [
          {
            id: storageMethodId,
            uri: encodedUri,
            read: true,
            write: true,
            browse: true,
            metadata: { field: [{ key: 'lastModified', value: new Date().toISOString() }] },
          },
        ],
      };
      return modifyStorage({ storageId, storageDocument });
    }
    const storageDocument = {
      type: 'LOCAL',
      capacity: 800000000000,
      method: [
        {
          uri: encodedUri,
          read: true,
          write: true,
          browse: true,
          metadata: { field: [{ key: 'lastModified', value: new Date().toISOString() }] },
        },
      ],
      metadata: { field: [] },
    };
    if (inputStorage) {
      storageDocument.metadata.field = [{ key: 'transcodeThemeSourceStorage', value: true }];
    } else if (outputStorage) {
      storageDocument.metadata.field = [
        { key: 'transcodeThemeOutputStorage', value: true },
        { key: 'filenameScript', value: filenameScript },
      ];
    }
    return createStorage({ storageDocument });
  };

  return (
    <Box height={1} display="flex" flexDirection="column">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <StorageSection
              name="input"
              fields={form}
              storage={input}
              initialValues={input.id ? { input } : { input: defaultValues }}
              updating={updatingInput}
              onUpdateStorage={onUpdateStorage}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <StorageSection
              name="output"
              fields={form}
              storage={output}
              initialValues={output.id ? { output } : { output: defaultValues }}
              updating={updatingOutput}
              onUpdateStorage={onUpdateStorage}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default withStyles(styles)(Settings);
