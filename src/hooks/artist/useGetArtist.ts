"use client"
import {useQuery, useQueryClient} from "react-query";

export default function useGetArtist(endpoint: string, artistId: string | undefined | string[]) {
    const queryClient=useQueryClient()
    return useQuery({
        queryKey: ['getArtist'],
        queryFn: async () => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/${endpoint}/${artistId}`);
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                const data = await resp.json()
                return data;
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        }
    })
}