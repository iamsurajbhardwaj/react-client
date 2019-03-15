import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = `${PUBLIC_IMAGE_FOLDER}default.png`;
export const options = [
  {
    label: 'Cricket',
    value: 'Cricket',
  },
  {
    label: 'Football',
    value: 'Football',
  },
];

export const cricket = [
  {
    label: 'Wicket Keeper',
    value: 'Wicket Keeper',
  },
  {
    label: 'Bowler',
    value: 'Bowler',
  },
  {
    label: 'BatsMan',
    value: 'BatsMan',
  },
  {
    label: 'AllRounder',
    value: 'AllRounder',
  },
];

export const football = [
  {
    label: 'Defender',
    value: 'Defender',
  },
  {
    label: 'Striker',
    value: 'Striker',
  },
];
export const checkStyle = {
  padding: '10px',
  margin: '10px',
  borderRadius: '10px',
  textAlign: 'right',
  color: 'black',
  backgroundColor: 'green',
};
export const checkStyle2 = {
  padding: '10px',
  margin: '10px',
  borderRadius: '10px',
  textAlign: 'right',
  color: 'black',
  backgroundColor: 'green',
};
export const state = {
  name: '',
  sport: '',
  role: '',
  errors: {
    name: '',
    sport: '',
    role: 'Role is required field.',
  },
  isTouched: {
    name: false,
    sport: false,
    role: true,
  },
  hasError: {
    name: false,
    sport: false,
    role: true,
  },
};
export const mainStyle = {
  display: 'flex',
  padding: '2px',
  flexDirection: 'column',
  margin: '10px',
};
export const schema = yup.object().shape({
  name: yup.string().min(3).required().label('Name'),
  sport: yup
    .string()
    .required().label('Sport'),
  role: yup
    .string()
    .required().label('Role'),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is a required field.'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*\d).{4,8}$/, 'Password must contain at-least one number.')
    .required('Password is a required field'),
});

export const schema1 = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required()
    .label('Name'),
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*\d).{4,8}$/, 'Password must contain at-least one number.')
    .required('Password must be required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password not match')
    .required()
    .label('Confirm password'),
});
