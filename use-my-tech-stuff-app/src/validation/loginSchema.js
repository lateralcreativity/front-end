import * as yup from 'yup';

const loginSchema = yup.object().shape({
    username: yup.string()
    .required('Username is a required field.'),
    password: yup.string()
    .required('Password is a required field.')
})

export default loginSchema;