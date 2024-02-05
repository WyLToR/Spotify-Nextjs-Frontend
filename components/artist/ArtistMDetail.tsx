import Link from "next/link";

export default function ArtistMDetail(props: any) {
    const Songs = () => {
        return (
            <>
                <div
                    className="max-w-screen-xl m-5 flex flex-wrap flex-col justify-between mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h1 className="text-2xl font-bold tracking-wider text-red-500 dark:text-red-500 mb-5">Songs</h1>
                    <ul>
                        {props.artist.albums.map((album: any) => {
                            return (
                                album.songs.map((song: any) => {
                                    return (
                                        <li key={song.id} className="flex gap-2">
                                            <Link className="text-l text-red-800 dark:text-red-800"
                                                href={{pathname: '/song/[id]', query: {id: song.id}}}>
                                                {song.title}
                                            </Link>
                                        </li>
                                    )
                                })
                            )
                        })}
                    </ul>
                </div>
            </>
        )
    };
    const Albums = () => {
        return (
            <>
                <div
                    className="max-w-screen-xl m-5 flex flex-wrap flex-col justify-between mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h1 className="text-2xl font-bold tracking-wider text-red-500 dark:text-red-500 mb-5">Albums</h1>
                    <ul>
                        {props.artist.albums.map((album: any) =>
                            <li key={album.id} className="flex gap-2">
                                <Link href={{pathname: '/album/[id]', query: {id: album.id}}}
                                      className="text-xl text-red-800 dark:text-red-800">{album.albumName}</Link>
                            </li>
                        )}
                    </ul>
                </div>

            </>
        )
    }
    return (
        <>
            <div
                className="max-w-screen-xl m-5 flex flex-wrap flex-col justify-between mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="max-w-screen-xl flex justify-between mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-red-500 dark:text-red-500">{props.artist.name}</h1>
                    <h1 className="text-2xl font-bold tracking-tight text-red-500 dark:text-red-500">{props.artist.genre}</h1>
                </div>
                <div className="max-w-screen-xl flex justify-between mb-5">
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {props.artist.biography}
                    </p>
                </div>
            </div>
            <Albums/>
            <Songs/>

        </>
    )
}