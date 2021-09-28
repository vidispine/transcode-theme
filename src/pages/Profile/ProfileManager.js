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

const [general, ...av] = sections;
const { fields: generalFields } = general;
const [nameField, ...restFields] = generalFields;

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

export const extractValues = ({ video, audio, format, name, description, createThumbnails }) =>
  new Promise((resolve, reject) => {
    const shapeTag = { metadata: {} };
    const errors = {};
    if (name) {
      if (name.includes(' ')) errors.name = 'Do not use blank spaces';
      else shapeTag.name = name;
    } else errors.name = 'Name is required';
    if (format) {
      shapeTag.format = format;
    } else shapeTag.format = 'Format is required';
    if (description) shapeTag.description = description;
    if (video) {
      shapeTag.video = {};
      const { codec, preset, framerate, bitrate, scaling } = video;
      if (codec) shapeTag.video.codec = codec;
      if (preset) shapeTag.video.preset = preset;
      if (bitrate) shapeTag.video.bitrate = bitrate;
      if (framerate) {
        let denominator = 25;
        let numerator = 1;
        if (typeof framerate === 'object') ({ denominator, numerator } = framerate);
        if (['string', 'integer'].includes(typeof framerate)) denominator = framerate;
        shapeTag.video.framerate = { denominator, numerator };
      }
      if (scaling) {
        let { width = 0, height = 0 } = video;
        if (typeof scaling === 'object') ({ width, height } = scaling);
        shapeTag.video.scaling = {
          ...(width && { width: Number(width) }),
          ...(height && { height: Number(height) }),
        };
      }
    }
    if (audio) {
      shapeTag.audio = {};
      const { codec, preset, sampleRate, sampleSize } = audio;
      if (codec) shapeTag.audio.codec = codec;
      if (preset) shapeTag.audio.preset = preset;
      if (sampleSize && !sampleRate) {
        if (!errors.audio) errors.audio = {};
        errors.audio.sampleRate = 'Sample rate is required if sample size is set';
      }
      if (!sampleSize && sampleRate) {
        if (!errors.audio) errors.audio = {};
        errors.audio.sampleSize = 'Sample size is required if sample rate is set';
      }
      if (sampleSize && sampleRate) {
        const size = Number(sampleSize);
        const rate = Number(sampleRate);
        shapeTag.audio.bitrate = size * rate * 1000;
        shapeTag.metadata.field = [
          ...(shapeTag.metadata.field || []),
          { key: 'sampleRate', value: rate },
          { key: 'sampleSize', value: size },
        ];
      }
    }
    if (createThumbnails) {
      shapeTag.metadata.field = [
        ...(shapeTag.metadata.field || []),
        ...(createThumbnails === true && [{ key: 'createThumbnails', value: true }]),
      ];
    }
    if (Object.keys(errors).length) reject(errors);
    else resolve(shapeTag);
  });

const Content = ({
  form,
  sections: fieldSections,
  handleSubmit,
  onClose,
  okText = 'Add new profile',
  classes,
}) => {
  const { submitting } = form.getState();
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle classes={{ root: classes.title }}>Profile manager</DialogTitle>
      <DialogContent classes={{ root: classes.content }}>
        {fieldSections.map(({ name, ...rest }) => (
          <Section key={name} {...rest} />
        ))}
      </DialogContent>
      <DialogActions classes={{ root: classes.actions }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={submitting} type="submit" variant="contained" color="primary">
          {okText}
        </Button>
      </DialogActions>
    </form>
  );
};

const ProfileManager = ({ onSuccess, onClose, open, classes, profile = {}, okText }) => {
  const { name } = profile;
  const [form] = React.useState(
    !name
      ? sections
      : [{ ...general, fields: [{ ...nameField, disabled: true }, ...restFields] }, ...av],
  );
  const handleSubmit = (values) =>
    extractValues(values)
      .then(onSuccess)
      .catch((err) => err);

  return (
    <Dialog classes={{ root: classes.root }} open={open} onClose={onClose}>
      <Form
        initialValues={profile}
        onSubmit={handleSubmit}
        sections={form}
        onClose={onClose}
        component={Content}
        classes={classes}
        okText={okText}
        subscription={{ submitting: true }}
      />
    </Dialog>
  );
};

export default withStyles(styles)(ProfileManager);
