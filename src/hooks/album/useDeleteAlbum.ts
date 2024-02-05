import Methods from "../../enums/methods";
import {backendurl} from "@/src/constants/contants";
import {useQueryClient, useMutation} from "react-query";

export default function useDeleteAlbum(endpoint: string, auth:any) {
    const queryClient=useQueryClient()
    return useMutation({
        mutationKey: ['deleteAlbum'],
        mutationFn: async (albumId) => {
            try {
                if (auth?.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${albumId}`, {
                        method: Methods.delete,
                        headers: {
                            'Authorization': `Bearer ${auth?.token}`
                        }
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