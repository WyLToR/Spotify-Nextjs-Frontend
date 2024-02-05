import {useMutation, useQueryClient} from "react-query";
import Methods from "../../enums/methods";
import {backendurl} from "@/src/constants/contants";


export default function useCreateSong(endpoint: string, auth: any) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['createSong'],
        mutationFn: async ({formData, file, albumId}: { formData: Song, file:any,  albumId: string | undefined }) => {
            try {
                const sendedData=new FormData()
                sendedData.append('title',formData.title)
                sendedData.append('songFile', file)
                if (auth.token !== null) {
                    const headers = {
                        'Authorization': `Bearer ${auth.token}`,
                    };
                    const resp = await fetch(`${backendurl}/${endpoint}/${albumId}`, {
                        method: Methods.post,
                        headers,
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
        onSuccess() {
            queryClient.invalidateQueries('getAllSongs')
        },
        onError(error) {
            console.error(error)
        }
    })
}