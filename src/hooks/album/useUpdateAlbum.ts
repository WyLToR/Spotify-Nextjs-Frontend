import Methods from "../../enums/methods";
import { useQueryClient, useMutation } from "react-query";
import { backendurl } from "@/src/constants/contants";

export default function useUpdateAlbum(endpoint: string, auth: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateAlbum'],
        mutationFn: async ({ formData, file, artistId, albumId }: {
            formData: Album,
            file: File,
            artistId: string | undefined,
            albumId: string | undefined
        }) => {
            try {
                if (auth.token !== null) {
                    const sendedForm = new FormData()
                    sendedForm.append('albumName', formData.albumName)
                    sendedForm.append('pictureFile', file)
                    const resp = await fetch(`${backendurl}/${endpoint}/${artistId}/${albumId}`, {
                        method: Methods.update,
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        },
                        body: sendedForm
                    })
                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }
                    const data = (await resp.json());
                    return data;
                } else {
                    console.error('Token is null.');
                    return null;
                }
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        },
        onSuccess(data) {
            queryClient.invalidateQueries('getAllAlbums')
        },
        onError(error) {
            console.error(error)
        }
    })
}