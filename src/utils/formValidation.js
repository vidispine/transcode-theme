export const required = (value) => (value ? undefined : 'Required');

export const noBlankSpace = (value) =>
  value.includes(' ') ? 'Cannot contain blank spaces' : undefined;

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);
