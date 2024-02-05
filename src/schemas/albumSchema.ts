import * as Yup from 'yup'

const albumSchema=Yup.object({
    albumName:Yup.string()
        .required('Name is required')
        .min(3, 'Min 3 character required'),
})
export default albumSchema;