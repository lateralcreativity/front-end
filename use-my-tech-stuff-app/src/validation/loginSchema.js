import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string()
    .required('Must be a valid email address.')
    .email('Must be a valid email address.'),
    password: yup.string()
    .required('Password is a required field.')
})

export default loginSchema;