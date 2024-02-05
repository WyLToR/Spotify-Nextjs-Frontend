import {useQuery} from "@tanstack/react-query";

export default function useGetSong(endpoint: string, songId: string) {
    return useQuery({
        queryKey: ['getSong'],
        queryFn: async () => {
            try {
                const resp = await fetch(`${process.env.DATABASE_URL}/${endpoint}/${songId}`)
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                const data = await resp.json()
                return data;

            } catch (error) {
                console.error(error)
                return null;
            }
        }
    })
}