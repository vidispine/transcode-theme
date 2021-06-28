import React from 'react';
import { withStyles } from '@material-ui/core';
import { ArrowDropDown, Lock } from '@material-ui/icons';
import { TextField, SelectField, CheckboxField } from '@vidispine/vdt-materialui';
import { Field } from 'react-final-form';

const MatchSource = ({ onChange, match: checked }) => (
  <CheckboxField input={{ onChange, checked }} color="primary" size="small" label="Match source" />
);

const styles = ({ spacing, typography }) => ({
  text: {
    marginTop: 0,
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      '& > label': {
        fontSize: typography.fontSize,
        position: 'relative',
        transform: 'none',
        marginLeft: spacing(2),
        marginBottom: spacing(1),
      },
      '& > fieldset': {
        top: 0,
        '& legend': {
          display: 'none',
        },
      },
      '& input': {
        padding: spacing(2),
      },
    },
  },
  checkbox: {
    marginTop: 0,
    paddingLeft: spacing(2),
    '& > p': {
      display: 'none',
    },
  },
  select: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      fontSize: typography.fontSize,
      position: 'relative',
      transform: 'none',
      marginLeft: spacing(2),
      marginBottom: spacing(1),
    },
    '& .MuiSelect-root': {
      padding: spacing(2, 4, 2, 2),
      '&.Mui-disabled > span::after': {
        content: '"Auto"',
      },
    },
    '& .VdtCheckboxField-root': {
      marginTop: 0,
      marginLeft: spacing(2),
      '& > p': {
        display: 'none',
      },
      '& span': {
        fontSize: typography.fontSize,
      },
    },
  },
});

const FieldSelector = ({ type, name, label, options, classes, match, placeholder }) => {
  const [checked, setChecked] = React.useState(match);
  return (
    <Field
      id={name}
      name={name}
      type={type}
      render={({ input, meta }) => {
        const { onBlur, onFocus } = input;
        switch (type) {
          case 'select':
            return (
              <SelectField
                input={input}
                meta={meta}
                onBlur={onBlur}
                onFocus={onFocus}
                type={type}
                label={label}
                options={options}
                variant="outlined"
                disabled={!!checked}
                classes={{ root: classes.select }}
                IconComponent={checked ? Lock : ArrowDropDown}
                FormHelperTextProps={
                  match !== undefined && {
                    checked,
                    onChange: ({ target }) => {
                      if (target.checked) input.onChange();
                      setChecked(target.checked);
                    },
                    component: MatchSource,
                  }
                }
              />
            );
          case 'checkbox':
            return (
              <CheckboxField
                input={input}
                type={type}
                meta={meta}
                color="primary"
                label={label}
                classes={{ root: classes.checkbox }}
              />
            );
          case 'text':
          default:
            return (
              <TextField
                input={input}
                meta={meta}
                type={type}
                label={label}
                classes={{ root: classes.text }}
                variant="outlined"
                InputLabelProps={{ shrink: false, 'data-shrink': true }}
                helperText={null}
                placeholder={placeholder}
              />
            );
        }
      }}
    />
  );
};

export default withStyles(styles)(FieldSelector);
