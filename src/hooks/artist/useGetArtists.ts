import { useQuery, useQueryClient } from "react-query";
import {backendurl} from "@/src/constants/contants";

export default function useGetArtists(endpoint: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['getAllArtists'],
        queryFn: async () => {
            try {
                const resp = await fetch(`${backendurl}/${endpoint}`)
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                const data = await resp.json();

                queryClient.setQueryData(['getAllArtists'], data);

                return data;
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        }
    })
}
