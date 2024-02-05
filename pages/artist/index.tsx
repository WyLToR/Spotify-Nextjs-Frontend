import {useEffect, useState} from "react";
import ArtistDetail from "@/components/artist/artist";
import {backendurl} from "@/src/constants/contants";

export const getStaticProps = async () => {
    const resp = await fetch(`${backendurl}/artist`);
    const data = await resp.json();

    return {
        props: {
            artist: data,
        },
    };
};

export default function ArtistPage({artist}: {
    artist: any[]
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        !isClient || (
            <>
                {artist.map((artist) => (
                    <div key={artist.id}>
                        <ArtistDetail artist={artist}/>
                    </div>
                ))}
            </>
        )
    );
}

