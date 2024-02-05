import {backendurl} from "@/src/constants/contants";
import {useEffect, useState} from "react";
import AlbumDetail from "@/components/album/album";

export const getStaticProps = async () => {
    const resp = await fetch(`${backendurl}/album`);
    const data = await resp.json()
    return {
        props: {
            album: data
        }
    }
}
export default function AlbumPage({album}: { album: Album[] }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        !isClient || (
            <>
                {album.map((album:any) => (
                  <div key={album.id}>
                    <AlbumDetail album={album}/>
                  </div>
                ))}
            </>
        )
    );
}

