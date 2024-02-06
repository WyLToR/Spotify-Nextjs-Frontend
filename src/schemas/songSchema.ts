import * as Yup from 'yup'

const songSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Min 3 character required'),
})

export default songSchema;