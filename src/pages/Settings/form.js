import { required, noBlankSpace, composeValidators } from '../../utils/formValidation';

export default [
  {
    name: 'protocol',
    label: 'Service',
    type: 'select',
    fullWidth: true,
    // validate: required,
    defaultValue: 's3',
    options: [
      {
        label: 'S3',
        value: 's3',
      },
    ],
  },
  {
    name: 'name',
    label: 'Bucket name *',
    type: 'string',
    validate: composeValidators(required, noBlankSpace),
    placeholder: 'Name',
  },
  {
    name: 'path',
    label: 'Bucket path *',
    type: 'string',
    validate: composeValidators(required, noBlankSpace),
    placeholder: 'Bucket name',
  },
  {
    name: 'accessKey',
    label: 'Access key *',
    type: 'password',
    placeholder: 'Access key',
    validate: required,
    fullWidth: true,
  },
  {
    name: 'secretKey',
    label: 'Secret key *',
    type: 'password',
    placeholder: 'Secret key',
    validate: required,
    fullWidth: true,
  },
  // {
  //   name: 'region',
  //   label: 'Cloud region',
  //   type: 'select',
  //   fullWidth: true,
  //   options: [
  //     {
  //       label: 'Auto',
  //       value: 'auto',
  //     },
  //     {
  //       label: 'EU West 1',
  //       value: 'eu-west-1',
  //     },
  //   ],
  // },
];
