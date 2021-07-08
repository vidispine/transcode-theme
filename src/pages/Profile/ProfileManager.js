/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Form } from 'react-final-form';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

import sections from './form';
import Section from './ProfileSection';

const styles = ({ spacing, palette }) => ({
  root: {},
  title: {},
  content: {
    maxHeight: '75vh',
    padding: spacing(2),
    backgroundColor: palette.background.default,
  },
  actions: {},
});

const extractValues = ({
  video,
  audio,
  format,
  name,
  description,
  createThumbnails,
  createPreview,
}) => {
  const output = { name, description, format, metadata: {} };
  if (video) {
    let { resolution, framerate, preset, width, height } = video;
    if (framerate) framerate = { denominator: framerate, numerator: 1 };
    if (resolution) {
      [width, height] = resolution.split('x');
      resolution = { width: Number(width), height: Number(height) };
    } else if (width && height) {
      resolution = { width, height };
    }
    if (preset) preset = [preset];
    output.video = { ...video, framerate, resolution, preset };
  }
  if (audio) {
    let { preset, bitrate } = audio;
    const { sampleSize, sampleRate, ...audioParams } = audio;
    if (sampleSize && sampleRate) bitrate = sampleSize * sampleRate * 1000;
    if (preset) preset = [preset];
    output.audio = { ...audioParams, bitrate, preset };
  }
  if (createThumbnails) {
    output.metadata.field = (output.metadata.field || []).concat([
      { key: 'createThumbnails', value: createThumbnails || false },
    ]);
  }
  if (createPreview) {
    output.metadata.field = (output.metadata.field || []).concat([
      { key: 'createPreview', value: createPreview || false },
    ]);
  }
  return output;
};

const Content = ({ form, handleSubmit, onClose, classes }) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle classes={{ root: classes.title }}>Profile manager</DialogTitle>
    <DialogContent classes={{ root: classes.content }}>
      {sections.map(({ name, ...rest }) => (
        <Section key={name} {...rest} />
      ))}
    </DialogContent>
    <DialogActions classes={{ root: classes.actions }}>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="submit" variant="contained" color="primary">
        Add new profile
      </Button>
    </DialogActions>
  </form>
);

const ProfileManager = ({ onSuccess, onClose, open, classes }) => {
  const form = React.useState(sections);
  const handleSubmit = (values) => onSuccess(extractValues(values));
  return (
    <Dialog classes={{ root: classes.root }} open={open} onClose={onClose}>
      <Form
        onSubmit={handleSubmit}
        sections={form}
        onClose={onClose}
        component={Content}
        classes={classes}
      />
    </Dialog>
  );
};

export default withStyles(styles)(ProfileManager);
