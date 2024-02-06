import { useContext, useState } from "react";
import useDeleteArtist from "@/src/hooks/artist/useDeleteArtist";
import { AuthContext } from "@/src/contexts/AuthContext";
import useGetArtists from "@/src/hooks/artist/useGetArtists";
import Spinner from "@/components/utils/spinner";
import { Artist } from "@/src/interfaces/hookInterfaces/artist/artist";
import artistSchema from "@/src/schemas/artistSchema";
import useUpdateArtist from "@/src/hooks/artist/useUpdateArtist";
import useCreateArtist from "@/src/hooks/artist/useCreateArtist";
import ModifyCreateModal from "@/components/modal/modifyCreateModal";
import { useFormik } from "formik";
import useCreateAlbum from "@/src/hooks/album/useCreateAlbum";
import albumSchema from "@/src/schemas/albumSchema";
import InputArtistContext from "@/components/artist/inputContext";
import InputAlbumContext from "@/components/album/inputContext";

export default function ArtistsDetail() {
  const { auth } = useContext(AuthContext);
  const [artistModal, setArtistModal] = useState(false);
  const [albumModal, setAlbumModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [updateArtist, setUpdateArtist] = useState<null | {
    id: string;
    name: string;
    genre: string;
    biography: string;
  }>(null);
  const { data: artists, isLoading: artistLoading } = useGetArtists("artist");
  const {
    mutate: createAlbum,
    isError: createAlbumError,
    data: createAlbumData,
    isSuccess: createAlbumSuccess,
  } = useCreateAlbum("album", auth);
  const { mutate } = useDeleteArtist("artist", auth);
  const {
    mutate: update,
    isError: updateError,
    data: updateData,
    isSuccess: updateSuccess,
  } = useUpdateArtist("artist", auth);
  const {
    mutate: createArtist,
    isError: createArtistError,
    data: createArtistData,
    isSuccess: createArtistSuccess,
  } = useCreateArtist("artist", auth);
  const artistFormik = useFormik({
    onSubmit: (formData: Artist) => {
      if (updateArtist) {
        update({ formData, file, artistId: updateArtist.id });
      } else {
        createArtist({ formData, file });
      }
      artistFormik.resetForm();
      console.log(createArtistData);
      const isCreateSuccess =
        (createArtistSuccess &&
          !createArtistError &&
          !createArtistData?.error) ||
        (updateSuccess && !updateError && !updateData?.error);
      if (isCreateSuccess) {
        setTimeout(() => {
          setArtistModal(false);
          setFile(null);
          setUpdateArtist(null);
        }, 1000);
      }
    },
    initialValues: {
      name: updateArtist?.name || "",
      genre: updateArtist?.genre || "",
      biography: updateArtist?.biography || "",
    },
    validationSchema: artistSchema,
  });
  const albumFormik = useFormik({
    onSubmit: (formData: Album) => {
      createAlbum({ formData, file, artistId: updateArtist?.id });
      albumFormik.resetForm();
      const isCreateSuccess =
        createAlbumSuccess && !createAlbumError && !createAlbumData?.error;
      if (isCreateSuccess) {
        setTimeout(() => {
          setAlbumModal(false);
          setFile(null);
          setUpdateArtist(null);
        }, 1000);
      }
    },
    initialValues: {
      albumName: "",
    },
    validationSchema: albumSchema,
  });
  if (artistLoading) {
    return <Spinner isLoading={artistLoading} />;
  }
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap flex-col justify-between mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-2 p-5">
          <p>Search</p>
          <input className="border-red-300 text-red-900 dark:text-red text-md rounded-lg focus:ring-red-500 focus:border-red-500 block  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
          <button
            className="m-2 text-red-500 hover:text-red-700"
            onClick={() => {
              setArtistModal(!artistModal);
            }}
          >
            New Artist
          </button>
        </div>
        <table className="table-auto text-center">
          <thead>
            <tr className="text-red-700">
              <th>Num</th>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Modify</th>
              <th>Delete</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist: any, idx: number) => (
              <tr key={artist.id} className="hover:bg-gray-700">
                <td>{idx + 1}</td>
                <td>{artist.id}</td>
                <td>{artist.name}</td>
                <td>{artist.genre}</td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setArtistModal(!artistModal);
                      setUpdateArtist(artist);
                    }}
                  >
                    Modify
                  </button>
                </td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      mutate(artist.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setAlbumModal(!albumModal);
                      setUpdateArtist(artist);
                    }}
                  >
                    New Album
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModifyCreateModal
        modal={{ modal: albumModal, setModal: setAlbumModal }}
        text={`Create Album for ${updateArtist?.name}`}
        type={{ edit: updateArtist, setEdit: setUpdateArtist }}
      >
        <InputAlbumContext
          file={{ file, setFile }}
          formik={albumFormik}
          text={`Create Album for ${updateArtist?.name}`}
        />
      </ModifyCreateModal>
      <ModifyCreateModal
        modal={{ modal: artistModal, setModal: setArtistModal }}
        text={updateArtist ? "Modify Artist" : "Create Artist"}
        type={{ edit: updateArtist, setEdit: setUpdateArtist }}
      >
        <InputArtistContext
          file={{ file, setFile }}
          formik={artistFormik}
          text={updateArtist ? "Modify Artist" : "Create Artist"}
        />
      </ModifyCreateModal>
    </>
  );
}
