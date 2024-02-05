import Methods from "../../enums/methods";
import {useQueryClient, useMutation} from "react-query";
import {backendurl} from "@/src/constants/contants";

export default function useDeleteSong(endpoint: string, auth:any) {
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey: ['deleteSong'],
        mutationFn: async (songId: string) => {
            try {
                if (auth.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${songId}`, {
                        method: Methods.delete,
                        headers: {
                            'Authorization': `Bearer ${auth.token}`
                        }
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
        onSuccess(data){
            queryClient.invalidateQueries('getAllSongs')
        },
        onError(error){
            console.error(error)
        }
    })
}