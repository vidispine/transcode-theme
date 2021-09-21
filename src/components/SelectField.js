/* eslint-disable no-unused-vars */
import * as React from 'react';
import isMatch from 'lodash.ismatch';
import MUISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import { CheckboxField } from '@vidispine/vdt-materialui';
import { ArrowDropDown, Lock } from '@material-ui/icons';

const HelperText = ({ children }) => (
  <>{children && <FormHelperText error>{children}</FormHelperText>}</>
);
export const MatchSource = ({ onChange, checked, children }) => {
  return (
    <>
      {children && <FormHelperText error>{children}</FormHelperText>}
      <CheckboxField
        input={{ onChange, checked }}
        color="primary"
        size="small"
        label="Match source"
      />
    </>
  );
};

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1),
    width: '100%',
    '& .MuiInputBase-root': {
      fontSize: '.75rem',
    },
    '& .MuiInputBase-input': {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  inputLabel: {},
  select: {},
  menuItem: {},
  formHelperText: {},
});

const defaultParseOptions = (opts) =>
  opts.map(({ value: val, ...rest }) => ({
    value: val,
    ...rest,
    ...(val !== 0 &&
      val !== 'nooptions' && {
        value: JSON.stringify(val),
      }),
  }));

const SelectField = ({
  input: { value, name, onChange, multiple, ...inputProps } = {},
  meta: { touched, error, submitError } = {},
  options = [],
  dependency,
  match = false,
  label,
  classes,
  className,
  FormControlProps = {},
  InputLabelProps = {},
  MenuItemProps = {},
  FormHelperTextProps = {},
  parseOptions = defaultParseOptions,
  ...props
}) => {
  const [opts, setOpts] = React.useState(parseOptions(options));
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    const filter = parseOptions(options);
    setOpts(filter);
    if (value && !filter.some(({ value: val }) => val === value))
      onChange({ target: { value: 0 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  const onToggle = ({ target: { checked: bool } }) => {
    setChecked(bool);
    if (bool) onChange({ target: { value: 0 } });
  };
  React.useEffect(() => {
    if (checked) onChange({ target: { value: 0 } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);
  return (
    <FormControl
      error={(error || submitError) && touched}
      disabled={checked}
      className={classes.root}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...FormControlProps}
    >
      <InputLabel
        htmlFor={name}
        className={classes.inputLabel}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...InputLabelProps}
      >
        {label}
      </InputLabel>
      <MUISelect
        name={name}
        onChange={onChange}
        value={value}
        multiple={multiple}
        className={classes.select}
        inputProps={inputProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {opts.map(({ value: optionValue, label: optionLabel, ...optionProps }) => {
          return (
            <MenuItem
              key={optionValue}
              value={optionValue}
              className={classes.menuItem}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...MenuItemProps}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...optionProps}
            >
              {optionLabel}
            </MenuItem>
          );
        })}
      </MUISelect>
      {match && (
        <MatchSource onChange={onToggle} checked={checked}>
          {touched && (error || submitError) ? error || submitError : ''}
        </MatchSource>
      )}
      {!match && (
        <HelperText className={classes.formHelperText}>
          {touched && (error || submitError) ? error || submitError : ''}
        </HelperText>
      )}
    </FormControl>
  );
};

export default withStyles(styles)(SelectField);
