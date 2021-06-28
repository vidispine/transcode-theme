/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Form } from 'react-final-form';

import { FieldSelector } from '../../components';
import sections from './form';

const Section = withStyles(({ spacing }) => ({
  root: {
    borderRadius: spacing(0.5),
    boxShadow: 'none',
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
    '&:before': {
      content: 'unset',
    },
  },
}))(({ title, fields, errors, submitFailed, classes }) => {
  const [expanded, setExpanded] = React.useState(true);
  const error = React.useMemo(
    () => submitFailed && fields.some(({ name }) => Object.keys(errors).includes(name)),
    [errors, fields, submitFailed],
  );
  return (
    <Accordion classes={classes} expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={error ? 'error' : 'initial'}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid spacing={2} container>
          {fields.map(({ name, fullWidth, ...props }) => (
            <Grid key={name} item xs={fullWidth ? 12 : 6}>
              <FieldSelector name={name} {...props} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
});

const Profile = withStyles(({ spacing, palette }) => ({
  root: {
    maxHeight: '75vh',
    padding: spacing(2),
    backgroundColor: palette.background.default,
  },
}))(({ handleSubmit, onClose, sectionds, classes, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle>Profile manager</DialogTitle>
    <DialogContent classes={classes}>
      {sections.map(({ title, fields }) => (
        <Section key={title} title={title} fields={fields} {...rest} />
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit" variant="contained" color="primary">
        Add new profile
      </Button>
    </DialogActions>
  </form>
));

export default ({ open, onClose, onSuccess }) => {
  const [form] = React.useState(sections);
  const validate = ({ name, format }) => ({
    name: !name ? 'Required' : undefined,
    format: !format ? 'Required' : undefined,
  });
  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        validate={validate}
        onSubmit={onSuccess}
        sections={form}
        onClose={onClose}
        component={Profile}
      />
    </Dialog>
  );
};
