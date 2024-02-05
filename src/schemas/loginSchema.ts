import * as Yup from 'yup'

const loginUserSchema=Yup.object({
    email:Yup.string()
        .required('Email is required')
        .email('Invalid email'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Min 6 character need')
})
export default loginUserSchema;