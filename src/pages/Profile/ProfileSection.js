/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import {
  withStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Grid,
} from '@material-ui/core';

import { FieldSelector } from '../../components';

const styles = ({ spacing }) => ({
  root: {
    borderRadius: spacing(0.5),
    boxShadow: 'none',
    marginTop: spacing(2),
    marginBottom: spacing(0),
    '&:before': {
      content: 'unset',
    },
  },
});

const Content = ({ fields, ...params }) => (
  <Grid spacing={2} container>
    {fields.map(({ name, fullWidth, ...props }) => {
      return (
        <Grid key={name} item xs={fullWidth ? 12 : 6}>
          <FieldSelector name={name} {...props} {...params} />
        </Grid>
      );
    })}
  </Grid>
);

const ProfileSection = ({ label, fields, errors, submitFailed, classes, ...props }) => {
  const [expanded, setExpanded] = React.useState(false);
  const error = React.useMemo(
    () => submitFailed && fields.some(({ name }) => Object.keys(errors).includes(name)),
    [errors, fields, submitFailed],
  );
  if (!label) return <Content fields={fields} errors={errors} />;
  return (
    <Accordion classes={classes} expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={error ? 'error' : 'initial'}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Content fields={fields} {...props} />
      </AccordionDetails>
    </Accordion>
  );
};

export default withStyles(styles)(ProfileSection);
