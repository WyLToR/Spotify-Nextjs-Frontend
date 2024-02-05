import {useQueryClient, useQuery} from "react-query";
import {backendurl} from "@/src/constants/contants";

export default function useGetAlbums(endpoint: string) {
    const queryClient=useQueryClient()
    return useQuery({
        queryKey: ['getAllAlbums'],
        queryFn: async () => {
            try {
                const resp = await fetch(`${backendurl}/${endpoint}`)
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                const data = await resp.json();
                return data;
            } catch
                (error) {
                console.error('Error:', error);
                return null;
            }
        }
    })
}

