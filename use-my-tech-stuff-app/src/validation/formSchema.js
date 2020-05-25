import * as yup from 'yup';

const formSchema = yup.object().shape({
    firstName: yup.string()
    .trim()
    .required('First name is a required field'),
    lastName: yup.string()
    .trim()
    .required('Last name is a required field'),
    email: yup.string()
    .required('Must be a valid email address.')
    .email('Must be a valid email address.'),
    password: yup.string()
    .required('Password is a required field.')
  })

  export default formSchema