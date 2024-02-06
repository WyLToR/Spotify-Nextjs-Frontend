import { useContext, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import useGetArtists from "@/src/hooks/artist/useGetArtists";
import useDeleteArtist from "@/src/hooks/artist/useDeleteArtist";
import useDeleteAlbum from "@/src/hooks/album/useDeleteAlbum";
import useGetAlbums from "@/src/hooks/album/useGetAlbums";
import Spinner from "@/components/utils/spinner";
import InputAlbumContext from "@/components/album/inputContext";
import ModifyCreateModal from "@/components/modal/modifyCreateModal";
import { useFormik } from "formik";
import albumSchema from "@/src/schemas/albumSchema";
import useUpdateAlbum from "@/src/hooks/album/useUpdateAlbum";
import InputSongContext from "@/components/song/inputContext";
import useCreateSong from "@/src/hooks/song/useCreateSong";
import songSchema from "@/src/schemas/songSchema";

export default function AlbumsDetail() {
  const { auth } = useContext(AuthContext);
  const [albumModal, setAlbumModal] = useState(false);
  const [songModal, setSongModal] = useState(false);
  const [updateAlbum, setUpdateAlbum] = useState<null | {
    id: string;
    pictureFile: File;
    artistId: string;
    albumName: string;
  }>(null);
  const { data: albums, isLoading: albumLoading } = useGetAlbums("album");
  const { mutate } = useDeleteAlbum("album", auth);
  const [file, setFile] = useState<File | null>(null);
  const {
    mutate: create,
    isError: createSongError,
    isSuccess: createSongSuccess,
    data: createSongData,
  } = useCreateSong("song", auth);
  const {
    mutate: update,
    isError: updateAlbumError,
    data: updateAlbumData,
    isSuccess: updateAlbumSuccess,
  } = useUpdateAlbum("album", auth);
  const albumFormik = useFormik({
    onSubmit: (formData: Album) => {
      update({
        formData,
        file,
        artistId: updateAlbum?.artistId,
        albumId: updateAlbum?.id,
      });
      albumFormik.resetForm();
      const isCreateSuccess =
        updateAlbumSuccess && !updateAlbumError && !updateAlbumData?.error;
      if (isCreateSuccess) {
        setTimeout(() => {
          setAlbumModal(false);
          setUpdateAlbum(null);
        }, 1000);
      }
    },
    initialValues: {
      albumName: "",
    },
    validationSchema: albumSchema,
  });
  const songFormik = useFormik({
    onSubmit: (formData: any) => {
      console.log(formData);
      create({ formData, file, albumId: updateAlbum?.id });
      songFormik.resetForm();
      const isCreateSuccess =
        createSongError && !createSongSuccess && !createSongData?.error;
      if (isCreateSuccess) {
        setTimeout(() => {
          setSongModal(false);
          setUpdateAlbum(null);
          setFile(null);
        }, 1000);
      }
    },
    initialValues: {
      title: "",
    },
    validationSchema: songSchema,
  });
  if (albumLoading) {
    return <Spinner isLoading={albumLoading} />;
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
              <th>Artist Name</th>
              <th>Name</th>
              <th>Modify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album: any, idx: number) => (
              <tr key={album.id} className="hover:bg-gray-700">
                <td>{idx + 1}</td>
                <td>{album.id}</td>
                <td>{album.artist.name}</td>
                <td>{album.albumName}</td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setAlbumModal(!albumModal);
                      setUpdateAlbum(album);
                    }}
                  >
                    Modify
                  </button>
                </td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      mutate(album.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="m-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSongModal(!songModal);
                      setUpdateAlbum(album);
                    }}
                  >
                    New Song
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModifyCreateModal
        modal={{ setModal: setAlbumModal, modal: albumModal }}
        text={`Update Album`}
        type={{ edit: updateAlbum, setEdit: setUpdateAlbum }}
      >
        <InputAlbumContext
          formik={albumFormik}
          file={{ file, setFile }}
          text={`Update Album`}
        />
      </ModifyCreateModal>
      <ModifyCreateModal
        modal={{ setModal: setSongModal, modal: songModal }}
        text={`Create song for ${updateAlbum?.albumName} album`}
        type={{ edit: updateAlbum, setEdit: setUpdateAlbum }}
      >
        <InputSongContext
          formik={songFormik}
          file={{ file, setFile }}
          text={`Create song for ${updateAlbum?.albumName} album`}
        />
      </ModifyCreateModal>
    </>
  );
}
