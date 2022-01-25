/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import isMatch from 'lodash.ismatch';
import { withStyles, FormHelperText, InputAdornment, IconButton } from '@material-ui/core';
import {
  TextField as VdtTextField,
  CheckboxField as VdtCheckboxField,
} from '@vidispine/vdt-materialui';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Field } from 'react-final-form';

import CustomSelectField from './SelectField';

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

const HelperText = ({ children }) => (
  <>{children && <FormHelperText error>{children}</FormHelperText>}</>
);

const autoValue = { label: 'Auto', value: 0, style: { display: 'none' } };
const emptyValue = { label: 'No options', disabled: true, value: 'nooptions' };

export const SelectField = withStyles(styles)(
  ({
    name,
    disabled,
    label,
    match,
    options,
    required,
    dependency,
    classes,
    defaultValue = 0,
    validate,
    ...params
  }) => {
    const [opts, setOpts] = React.useState([...options, autoValue]);
    React.useEffect(() => {
      if (!dependency) return;
      const filter = options.filter(({ dependency: key }) => {
        if (!key) return true;
        return key.some((d) => isMatch(d, dependency));
      });
      setOpts([...(filter.length ? filter : [emptyValue]), autoValue]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependency]);
    return (
      <Field
        id={name}
        name={name}
        type="select"
        format={(v) => JSON.stringify(v)}
        parse={(v) => JSON.parse(v)}
        validate={validate}
        defaultValue={defaultValue}
        render={({ input, meta }) => (
          <CustomSelectField
            meta={meta}
            type="select"
            input={input}
            label={label}
            options={opts}
            match={match}
            variant="outlined"
            classes={{ root: classes.select }}
            disabled={disabled}
            dependency={dependency}
            InputLabelProps={{ disabled: true }}
            {...params}
          />
        )}
      />
    );
  },
);

export const CheckboxField = withStyles(styles)(
  ({ name, disabled, label, required, classes, ...params }) => {
    return (
      <Field
        id={name}
        name={name}
        label={label}
        type="checkbox"
        color="primary"
        classes={{ root: classes.checkbox }}
        disabled={disabled}
        required={required}
        component={VdtCheckboxField}
        {...params}
      />
    );
  },
);

export const TextField = withStyles(styles)(
  ({ name, disabled, label, required, placeholder, classes, validate, ...params }) => {
    return (
      <Field
        id={name}
        name={name}
        type="text"
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        required={required}
        disabled={disabled}
        validate={validate}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        FormHelperTextProps={{ component: HelperText }}
        {...params}
      />
    );
  },
);

// function PasswordField(props) {
//   const [showPassword, setShowPassword] = React.useState(false);
//   return (
//     <TextField
//       type={showPassword ? 'text' : 'password'}
//       autoComplete="new-password"
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton onClick={() => setShowPassword((prev) => !prev)}>
//               {showPassword ? <Visibility /> : <VisibilityOff />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       {...props}
//     />
//   );
// }

export const PasswordField = withStyles(styles)(
  ({ name, disabled, label, required, placeholder, validate, classes, ...params }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Field
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        disabled={disabled}
        validate={validate}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={disabled}
                size="small"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{ component: HelperText }}
        {...params}
      />
    );
  },
);

export const NumberField = withStyles(styles)(
  ({ name, disabled, label, required, placeholder, validate, classes, ...params }) => {
    return (
      <Field
        id={name}
        name={name}
        type="number"
        label={label}
        variant="outlined"
        classes={{ root: classes.text }}
        disabled={disabled}
        validate={validate}
        component={VdtTextField}
        helperText={null}
        placeholder={placeholder}
        InputLabelProps={{ shrink: false, 'data-shrink': true }}
        FormHelperTextProps={{ component: HelperText }}
        {...params}
      />
    );
  },
);

export const FieldSelector = ({
  type,
  errors,
  dependency = [],
  checkedDependencies = {},
  ...params
}) => {
  let FieldType = TextField;
  if (type === 'number') FieldType = NumberField;
  if (type === 'select') FieldType = SelectField;
  if (type === 'checkbox') FieldType = CheckboxField;
  if (type === 'password') FieldType = PasswordField;
  if (!dependency.length) return <FieldType {...params} dependency={checkedDependencies} />;
  const [key, ...rest] = dependency;
  return (
    <Field name={key}>
      {({ input: { value: val } }) => (
        <FieldSelector
          {...params}
          type={type}
          checkedDependencies={{ ...checkedDependencies, [key]: val }}
          dependency={rest}
        />
      )}
    </Field>
  );
};

export default FieldSelector;
