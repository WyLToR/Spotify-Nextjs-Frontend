import Link from "next/link";

export default function ArtistDetail(props: any) {
    return (
        <Link
            href={{pathname: "/artist/[id]", query: {id: props.artist.id}}}
            className="max-w-screen-xl m-5 flex flex-wrap flex-col justify-between mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-500 dark:text-red-500">
                {props.artist.name}
            </h5>
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.artist.genre}
            </h6>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {props.artist.biography}
            </p>
        </Link>
    );
}

