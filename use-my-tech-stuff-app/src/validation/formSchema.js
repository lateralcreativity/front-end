import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup.string()
    .trim()
    .required('Username is a required field.'),
    email: yup.string()
    .required('Must be a valid email address.')
    .email('Must be a valid email address.'),
    password: yup.string()
    .required('Password is a required field.'),
    type: yup.string()
    .required('User type is a required field.')
  })

  export default formSchema