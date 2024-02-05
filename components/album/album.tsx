import Link from "next/link";

export default function AlbumDetail(props: any) {
    return (
        <Link
            href={{pathname: "/album/[id]", query: {id: props.album.id}}}
            className="max-w-screen-xl m-5 flex flex-wrap flex-col justify-between mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            key={props.key}
        >
            <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500 dark:text-red-500">
                    {props.album.albumName}
                </h5>
            </div>
        </Link>
    );
}