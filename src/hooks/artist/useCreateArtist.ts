import Methods from "../../enums/methods";
import {Artist, ArtistResponse} from "../../interfaces/hookInterfaces/artist/artist";
import {useQueryClient, useMutation} from "react-query";
import {backendurl} from "@/src/constants/contants";

export default function useCreateArtist(endpoint: string, auth: any) {
  const queryClient=useQueryClient()
  return useMutation({
    mutationKey: ['createArtist'],
    mutationFn: async (formData: Artist) => {

      try {
        if (auth.token !== null) {
          const resp = await fetch(`${backendurl}/${endpoint}`, {
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
      queryClient.invalidateQueries('getAllArtists')
    },
    onError(error) {
      console.error(error)
    }
  })
}