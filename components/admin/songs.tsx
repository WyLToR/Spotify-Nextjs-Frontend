import ModifyCreateModal from "@/components/modal/modifyCreateModal";
import InputAlbumContext from "@/components/album/inputContext";
import InputArtistContext from "@/components/artist/inputContext";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import useGetSongs from "@/src/hooks/song/useGetSongs";
import useDeleteSong from "@/src/hooks/song/useDeleteSong";
import Spinner from "@/components/utils/spinner";
import { useFormik } from "formik";
import albumSchema from "@/src/schemas/albumSchema";
import useUpdateSong from "@/src/hooks/song/useUpdateSong";
import InputSongContext from "@/components/song/inputContext";
import songSchema from "@/src/schemas/songSchema";

export default function SongsDetail() {
  const { auth } = useContext(AuthContext);
  const [songModal, setSongModal] = useState(false);
  const [updateSong, setUpdateSong] = useState<null | {
    title: string;
    songFile: File;
    id: string;
    albumId: string;
  }>(null);
  const { data: songs, isLoading: songsLoading } = useGetSongs("song");
  const { mutate } = useDeleteSong("song", auth);
  const [file, setFile] = useState<File | null>(null);
  const {
    mutate: update,
    isError: updateSongError,
    data: updateSongData,
    isSuccess: updateSongSuccess,
  } = useUpdateSong("song", auth);
  const songFormik = useFormik({
    onSubmit: (formData: any) => {
      update({
        formData,
        file,
        albumId: updateSong?.albumId,
        songId: updateSong?.id,
      });
      songFormik.resetForm();
      const isCreateSuccess =
        updateSongError && !updateSongSuccess && !updateSongData?.error;
      if (isCreateSuccess) {
        setTimeout(() => {
          setSongModal(false);
          setUpdateSong(null);
        }, 1000);
      }
    },
    initialValues: {
      title: "",
    },
    validationSchema: songSchema,
  });
  if (songsLoading) {
    return <Spinner isLoading={songsLoading} />;
  }
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap flex-col justify-between mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-2 p-5">
          <p>Search</p>
          <input className="border-red-300 text-red-900 dark:text-red text-md rounded-lg focus:ring-red-500 focus:border-red-500 block  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        </div>
        <table className="table-auto text-center">
          <thead>
            <tr className="text-red-700">
              <th>Num</th>
              <th>ID</th>
              <th>Title</th>
              <th>Modify</th>
              <th>Delete</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song: any, idx: number) => (
              <tr key={song.id} className="hover:bg-gray-700">
                <td>{idx + 1}</td>
                <td>{song.id}</td>
                <td>{song.title}</td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSongModal(!songModal);
                      setUpdateSong(song);
                    }}
                  >
                    Modify
                  </button>
                </td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      mutate(song.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>{song.album.albumName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModifyCreateModal
        modal={{ modal: songModal, setModal: setSongModal }}
        type={{ edit: updateSong, setEdit: setUpdateSong }}
        text={`Modify song`}
      >
        <InputSongContext
          formik={songFormik}
          file={{ file, setFile }}
          text={`Modify song`}
        />
      </ModifyCreateModal>
    </>
  );
}
