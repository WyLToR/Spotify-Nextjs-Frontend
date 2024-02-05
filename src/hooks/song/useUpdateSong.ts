import { backendurl } from "@/src/constants/contants";
import Methods from "../../enums/methods";
import {useQueryClient, useMutation} from "react-query";


export default function useUpdateSong(endpoint: string, auth: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['updateSong'],
        mutationFn: async ({formData, file, albumId, songId}: {
            formData: Song,
            file: File
            albumId: string | undefined,
            songId: string | undefined
        }) => {
            try {
                const sendedData = new FormData()
                sendedData.append('title', formData.title)
                sendedData.append('songFile', file)
                if (auth.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${albumId}/${songId}`, {
                        method: Methods.update,
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        },
                        body: sendedData
                    })

                    if (!resp.ok) {
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }

                    const data = await resp.json()
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
            queryClient.invalidateQueries('getAllSongs')
        },
        onError(error) {
            console.error(error)
        }
    })
}