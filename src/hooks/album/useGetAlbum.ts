import {useQuery} from "@tanstack/react-query";

export default function useGetAlbum(endpoint: string, albumId: string) {
    return useQuery({
        queryKey: ['getAlbum'],
        queryFn: async () => {
            try {
                const resp = await fetch(`${process.env.DATABASE_URL}/${endpoint}/${albumId}`)
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