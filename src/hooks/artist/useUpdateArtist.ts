import { Artist } from "../../interfaces/hookInterfaces/artist/artist";
import Methods from "../../enums/methods";
import { backendurl } from "@/src/constants/contants";
import { useQueryClient, useMutation } from "react-query";

export default function useUpdateArtist(endpoint: string, auth: any) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateArtist'],
    mutationFn: async ({ formData, file, artistId }: {
      formData: Artist,
      file: File,
      artistId: string
    }) => {
      try {
        if (auth.token !== null) {
          const sendedForm = new FormData()
          sendedForm.append('name', formData.name)
          sendedForm.append('genre', formData.genre)
          sendedForm.append('biography', formData.biography)
          sendedForm.append('pictureFile', file)
          const resp = await fetch(`${backendurl}/${endpoint}/${artistId}`, {
            method: Methods.update,
            headers: {
              'Authorization': `Bearer ${auth.token}`
            },
            body: sendedForm
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
    onSuccess() {
      queryClient.invalidateQueries('getAllArtists')
    },
    onError(error) {
      console.error(error)
    }
  })
}