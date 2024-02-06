import Methods from "../../enums/methods";
import { Artist, ArtistResponse } from "../../interfaces/hookInterfaces/artist/artist";
import { useQueryClient, useMutation } from "react-query";
import { backendurl } from "@/src/constants/contants";

export default function useCreateArtist(endpoint: string, auth: any) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createArtist'],
    mutationFn: async ({ formData, file }: { formData: Artist, file: File }) => {
      try {
        const sendedForm = new FormData()
        sendedForm.append('name', formData.name)
        sendedForm.append('genre', formData.genre)
        sendedForm.append('biography', formData.biography)
        sendedForm.append('pictureFile', file)
        if (auth.token !== null) {
          const resp = await fetch(`${backendurl}/${endpoint}`, {
            method: Methods.post,
            headers: {
              'Authorization': `Bearer ${auth.token}`
            },
            body: sendedForm
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