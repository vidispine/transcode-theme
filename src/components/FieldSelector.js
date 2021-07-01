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
  },
});

const SelectField = ({ name, label, match, options, required, dependency, classes }) => {
  const autoValue = { label: 'Auto', value: 'AUTO', style: { display: 'none' } };
  const emptyValue = { label: 'No options', disabled: true, value: 0 };
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
              required={required}
              disabled={!!checked}
              IconComponent={checked ? Lock : ArrowDropDown}
              InputLabelProps={{ required }}
              FormHelperTextProps={
                match !== undefined && {
                  checked,
                  onChange: ({ target }) => {
                    if (target.checked) input.onChange('AUTO');
                    else if (opts.length > 2) input.onChange(opts[0].value);
                    else input.onChange();
                    setChecked(target.checked);
                  },
                  component: MatchSource,
                }
              }
            />
          );
        }}
      />
    </>
  );
};

const CheckboxField = ({ name, label, required, classes }) => {
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
    />
  );
};

const TextField = ({ name, label, required, placeholder, classes }) => {
  return (
    <Field
      id={name}
      name={name}
      type="text"
      label={label}
      variant="outlined"
      classes={{ root: classes.text }}
      required={required}
      component={VdtTextField}
      helperText={null}
      placeholder={placeholder}
      InputLabelProps={{ shrink: false, 'data-shrink': true }}
    />
  );
};

const NumberField = ({ name, label, required, placeholder, classes }) => {
  return (
    <Field
      id={name}
      name={name}
      type="number"
      label={label}
      variant="outlined"
      classes={{ root: classes.text }}
      required={required}
      component={VdtTextField}
      helperText={null}
      placeholder={placeholder}
      InputLabelProps={{ shrink: false, 'data-shrink': true }}
    />
  );
};

const FieldSelector = ({ type, dependency, ...params }) => {
  let FieldType = TextField;
  if (type === 'number') FieldType = NumberField;
  if (type === 'select') FieldType = SelectField;
  if (type === 'checkbox') FieldType = CheckboxField;
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

export default withStyles(styles)(FieldSelector);
