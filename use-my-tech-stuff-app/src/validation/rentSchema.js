import * as yup from 'yup';

const rentSchema = yup.object().shape({
    name: yup.string()
    .trim()
    .required('Item name is a required field.'),
    description: yup.string()
    .trim()
    .required('Item description is a required field.'),
    exchange_method: yup.string()
    .trim()
    .required('Exchange method is a required field.'),
    price_per_day_in_dollars: yup.string()
    .required('Price per day in USD is a required field.'),
    is_currently_available: yup.string().nullable(),
    owner_id: yup.string().nullable(),
    renter_id: yup.string().nullable()
})

export default rentSchema;