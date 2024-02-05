import {backendurl} from "@/src/constants/contants";
import {useEffect, useState} from "react";
import AlbumDetail from "@/components/album/album";
import ArtistMDetail from "@/components/artist/ArtistMDetail";


export const getStaticProps = async ({ params }: { params: { id: string } }) => {
    const resp = await fetch(`${backendurl}/album/${params.id}`);
    const data = await resp.json();
    return {
        props: {
            album: data,
        },
    };
};
export const getStaticPaths = async () => {
    const resp = await fetch(`${backendurl}/album`);
    const data = await resp.json()
    const paths = data.map((album: { id: number }) => ({
        params: {id: album.id.toString()}
    }));
    return {
        paths,
        fallback: false,
    };
}
export default function AlbumDetailPage({album}: { album: Album }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        !isClient || (
            <>
                {<AlbumDetail album={album}/>}
            </>
        )
    );
}