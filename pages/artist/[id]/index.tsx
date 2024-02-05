"use client"
import {useState, useEffect} from "react"
import {backendurl} from "@/src/constants/contants";
import {Artist} from "@/src/interfaces/hookInterfaces/artist/artist";
import ArtistMDetail from "@/components/artist/ArtistMDetail";

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
    const resp = await fetch(`${backendurl}/artist/${params.id}`);
    const data = await resp.json();
    return {
        props: {
            artist: data,
        },
    };
};

export const getStaticPaths = async () => {
    const resp = await fetch(`${backendurl}/artist`);
    const data = await resp.json();
    const paths = data.map((artist: { id: number }) => ({
        params: {id: artist.id.toString()}
    }));
    return {
        paths,
        fallback: false,
    };
};
export default function ArtistDetailPage({artist}: { artist: Artist }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        !isClient || (
            <>
                {<ArtistMDetail artist={artist}/>}
            </>
        )
    );
}


