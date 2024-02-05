import * as Yup from 'yup'

const songSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Min 3 character required'),
    // songFile: Yup.mixed()
    //     .required('File is required')
    //     .test('is-audio', 'File must be an audio file', (value) => {
    //         return isAudioFile(value);
    //     }),
})

function isAudioFile(value: any) {
    if (!value) {
        return false;
    }

    const supportedFormats = ['mp3', 'wav', 'ogg'];
    const fileExtension = value.split('.').pop();

    return supportedFormats.includes(fileExtension.toLowerCase());
}

export default songSchema;