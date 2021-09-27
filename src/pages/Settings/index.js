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

import { useConfiguration } from '../../context';
import { FieldSelector } from '../../components';

const styles = ({ spacing }) => ({
  root: {
    '& button:not(:last-child)': {
      marginRight: spacing(2),
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
    type: 'string',
    placeholder: 'Access key',
    fullWidth: true,
    required: true,
  },
  {
    name: 'secretKey',
    label: 'Secret key',
    type: 'password',
    placeholder: 'Access key',
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
          {id && !error && <Check color="secondary" />}
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
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
          {isEditing && (
            <Button disabled={!id && pristine} onClick={reset}>
              {!id ? 'Reset' : 'Cancel'}
            </Button>
          )}
          {isEditing && (
            <Button disabled={pristine} variant="contained" color="primary" type="submit">
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
  const { storages: { input, output } = {}, isLoading, onUpdateStorage } = useConfiguration();
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
