import * as Yup from 'yup'

const artistSchema=Yup.object({
    name:Yup.string()
        .required('Name is required')
        .min(3, 'Min 3 character required'),
    genre: Yup.string()
        .required('Genre is required')
        .min(2, 'Min 2 character need'),
    biography: Yup.string()
        .required('Biography is required')
})
export default artistSchema;