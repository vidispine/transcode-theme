/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core';
import { ArrowDropDown, Lock } from '@material-ui/icons';
import {
  TextField as VdtTextField,
  SelectField as VdtSelectField,
  CheckboxField as VdtCheckboxField,
} from '@vidispine/vdt-materialui';
import { Field } from 'react-final-form';

export const MatchSource = ({ onChange, match: checked }) => (
  <VdtCheckboxField
    input={{ onChange, checked }}
    color="primary"
    size="small"
    label="Match source"
  />
);

const styles = ({ spacing, typography, palette }) => ({
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
        backgroundColor: palette.background.paper,
        padding: spacing(2),
      },
      '& .Mui-disabled': {
        '& fieldset': {
          opacity: 0.3,
        },
        '& input': {
          color: palette.text.primary,
          '&::placeholder': {
            opacity: 0,
          },
        },
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
      backgroundColor: palette.background.paper,
      padding: spacing(2, 4, 2, 2),
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
    '& .Mui-disabled': {
      '& .MuiSelect-root': {
        color: palette.text.primary,
      },
      '& fieldset': {
        opacity: 0.3,
      },
      '& svg': {
        visibility: 'hidden',
      },
      '& label': {
        color: palette.text.disabled,
      },
    },
  },
});

export const SelectField = withStyles(styles)(
  ({ name, label, match, options, required, dependency, classes, defaultValue, ...params }) => {
    const autoValue = { label: 'Auto', value: 0, style: { display: 'none' } };
    const emptyValue = { label: 'No options', disabled: true, value: 'nooptions' };
    const ref = React.createRef();
    const [opts, setOptions] = React.useState([...options, autoValue]);
    const [checked, setChecked] = React.useState(match);
    React.useEffect(() => {
      if (dependency === undefined) return;
      const { value, onChange } = ref.current;
      const filter = options.filter(({ dependency: key }) => {
        if (!dependency || !key) return true;
        return key.includes(dependency);
      });
      if (filter.length) {
        const active = filter.find(({ value: val }) => val === value);
        if (!active && !checked && dependency) onChange(filter[0].value);
      } else {
        if (!checked && dependency) onChange();
        filter.push(emptyValue);
      }
      setOptions(filter.concat([autoValue]));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency, options]);
    return (
      <>
        <Field
          id={name}
          name={name}
          type="select"
          validate={required ? (v) => !v && 'Required' : ''}
          defaultValue={defaultValue}
          render={({ input, meta }) => {
            if (!ref.current) ref.current = input;
            return (
              <VdtSelectField
                meta={meta}
                type="select"
                input={input}
                label={label}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                options={opts}
                variant="outlined"
                classes={{ root: classes.select }}
                disabled={!!checked}
                IconComponent={checked ? Lock : ArrowDropDown}
                FormHelperTextProps={
                  match !== undefined && {
                    checked,
                    onChange: ({ target }) => {
                      if (target.checked) input.onChange(0);
                      else if (opts.length > 2) input.onChange(opts[0].value);
                      else input.onChange();
                      setChecked(target.checked);
                    },
                    component: MatchSource,
                  }
                }
                InputLabelProps={{ disabled: true }}
                {...params}
              />
            );
          }}
        />
      </>
    );
  },
);

export const CheckboxField = withStyles(styles)(({ name, label, required, classes, ...params }) => {
  return (
    <Field
      id={name}
      name={name}
      label={label}
      type="checkbox"
      color="primary"
      classes={{ root: classes.checkbox }}
      required={required}
      component={VdtCheckboxField}
      {...params}
    />
  );
});

export const TextField = withStyles(styles)(
  ({ name, label, required, placeholder, classes, ...params }) => {
    return (
      <Field
        validate={required ? (v) => !v && 'Required' : ''}
        id={name}
        name={name}
        type="text"
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        {...params}
      />
    );
  },
);

export const PasswordField = withStyles(styles)(
  ({ name, label, required, placeholder, classes, ...params }) => {
    return (
      <Field
        validate={required ? (v) => !v && 'Required' : ''}
        id={name}
        name={name}
        type={params.disabled ? 'password' : 'text'}
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        {...params}
      />
    );
  },
);

export const NumberField = withStyles(styles)(
  ({ name, label, required, placeholder, classes, ...params }) => {
    return (
      <Field
        validate={required ? (v) => !v && 'Required' : ''}
        id={name}
        name={name}
        type="number"
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        {...params}
      />
    );
  },
);

export const FieldSelector = ({ type, dependency, ...params }) => {
  let FieldType = TextField;
  if (type === 'number') FieldType = NumberField;
  if (type === 'select') FieldType = SelectField;
  if (type === 'checkbox') FieldType = CheckboxField;
  if (type === 'password') FieldType = PasswordField;
  if (!dependency) return <FieldType {...params} />;
  const { key, value } = dependency;
  return (
    <Field name={key} subscription={{ value: true }}>
      {({ input: { value: val } }) => {
        if (value !== undefined && val !== value) return null;
        return <FieldType {...params} dependency={val} />;
      }}
    </Field>
  );
};

export default FieldSelector;
