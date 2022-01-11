/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSnackbar } from 'notistack';
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
} from '@material-ui/core';

import { CheckCircle as Check, Error } from '@material-ui/icons';
import { Form } from 'react-final-form';

import { useGetStorages, useCreateStorage, useModifyStorage } from '../../hooks/storage';
import filenameScript from './filenameScript';
import { FieldSelector } from '../../components';

const styles = ({ spacing, palette }) => ({
  root: {
    '& button:not(:last-child)': {
      marginRight: spacing(2),
    },
    '& .MuiSvgIcon-root.success': {
      fill: palette.success.main,
    },
  },
});

const form = [
  {
    name: 'protocol',
    label: 'Service',
    type: 'select',
    fullWidth: true,
    options: [
      {
        label: 'S3',
        value: 's3',
      },
    ],
  },
  {
    name: 'name',
    label: 'Bucket name',
    type: 'string',
    placeholder: 'Name',
    required: true,
  },
  {
    name: 'path',
    label: 'Bucket path',
    type: 'string',
    placeholder: 'Bucket name',
    required: true,
  },
  {
    name: 'accessKey',
    label: 'Access key',
    type: 'password',
    placeholder: 'Access key',
    fullWidth: true,
    required: true,
  },
  {
    name: 'secretKey',
    label: 'Secret key',
    type: 'password',
    placeholder: 'Secret key',
    fullWidth: true,
    required: true,
  },
  // {
  //   name: 'region',
  //   label: 'Cloud region',
  //   type: 'select',
  //   fullWidth: true,
  //   options: [
  //     {
  //       label: 'Auto',
  //       value: 'auto',
  //     },
  //     {
  //       label: 'EU West 1',
  //       value: 'eu-west-1',
  //     },
  //   ],
  // },
];

const StorageForm = withStyles(styles)(
  ({ fields, name, handleSubmit, storage = {}, classes, pristine, form: ref }) => {
    const [{ id, protocol, lastSuccess = 1971, lastFailure = 1970, failureMessage }] =
      React.useState(storage);
    const error = new Date(lastSuccess) - new Date(lastFailure) < 0;
    const [isEditing, setIsEditing] = React.useState(!id);
    const title = name.charAt(0).toUpperCase() + name.slice(1);
    const reset = () => {
      ref.reset();
      if (id) setIsEditing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => setIsEditing(!id), [id]);
    return (
      <Paper component="form" onSubmit={handleSubmit} classes={classes}>
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
          {id && error && (
            <Tooltip title={failureMessage}>
              <Error color="error" />
            </Tooltip>
          )}
          {id && !error && <Check className="success" />}
        </Box>
        <Box p={2}>
          <Grid spacing={2} container>
            {fields.map(({ name: fieldName, fullWidth, ...props }) => (
              <Grid key={fieldName} item xs={fullWidth ? 12 : 6}>
                <FieldSelector disabled={!isEditing} name={`${name}.${fieldName}`} {...props} />
              </Grid>
            ))}
          </Grid>
        </Box>
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
      </Paper>
    );
  },
);

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: { input, output } = {}, isLoading } = useGetStorages();
  // eslint-disable-next-line no-unused-vars
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
        method: [{ id: storageMethodId, uri: encodedUri, read: true, write: true, browse: true }],
      };
      return modifyStorage({ storageId, storageDocument });
    }
    const storageDocument = {
      type: 'LOCAL',
      capacity: 800000000000,
      method: [{ uri: encodedUri, read: true, write: true, browse: true }],
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

  const handleSubmit = (values) =>
    onUpdateStorage(values)
      .then(() => enqueueSnackbar('Success!', { variant: 'success' }))
      .catch(() => enqueueSnackbar('Failed', { variant: 'error' }));
  return (
    <Box height={1} display="flex" flexDirection="column">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Form
              name="input"
              fields={form}
              storage={input}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              component={StorageForm}
              subscription={{ pristine: true, submitting: true }}
              initialValues={{ input }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Form
              name="output"
              fields={form}
              storage={output}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              component={StorageForm}
              subscription={{ pristine: true, submitting: true }}
              initialValues={{ output }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles({})(Settings);
