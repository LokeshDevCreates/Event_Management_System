import * as yup from 'yup';

const OrganizerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .required('Age is required'),

  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),

  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, 'Phone number must be 10 digits and start with 6-9')
    .required('Phone number is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  organizationType: yup
    .string()
    .oneOf(['individual', 'company', 'college', 'ngo', 'others'], 'Invalid organization type')
    .required('Organization type is required'),

  organizationName: yup
    .string()
    .when('organizationType', ([type], schema) =>
      ['company', 'college', 'ngo'].includes(type)
        ? schema.required('Organization name is required')
        : schema.notRequired()
    ),

  profession: yup
    .string()
    .when('organizationType', ([type], schema) =>
      ['individual', 'company', 'college', 'ngo'].includes(type)
        ? schema.required('Profession is required')
        : schema.notRequired()
    ),

  description: yup
    .string()
    .when('organizationType', ([type], schema) =>
      type === 'others'
        ? schema.required('Description is required')
        : schema.notRequired()
    ),

  profileImage: yup
    .mixed()
    .nullable()
});
export default OrganizerSchema;
