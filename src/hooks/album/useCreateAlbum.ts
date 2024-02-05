import Methods from "../../enums/methods";
import {backendurl} from "@/src/constants/contants";
import {useQueryClient, useMutation} from "react-query";

export default function useCreateAlbum(endpoint: string, auth: any) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['createAlbum'],
        mutationFn: async ({formData, artistId}: { formData: Album, artistId: string | undefined }) => {
            try {
                if (auth.token !== null) {
                    const resp = await fetch(`${backendurl}/${endpoint}/${artistId}`, {
                        method: Methods.post,
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${auth.token}`
                        },
                        body: JSON.stringify(formData)
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
            queryClient.invalidateQueries('getAllAlbums')
        },
        onError(error) {
            console.error(error)
        }
    })
}