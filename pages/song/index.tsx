import {backendurl} from "@/src/constants/contants";
import SongDetail from '@/components/song/song'
import {useEffect, useState} from "react";

export const getStaticProps = async () => {
    const resp = await fetch(`${backendurl}/song`);
    const data = await resp.json()
    return {
        props: {
            songs: data
        }
    }
}
export default function SongPage({songs}: { songs: Song[] }) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        !isClient || (
            <>
                <main className="grid place-items-center">
                    <section className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {songs.map((song: any) => (
                            <div key={song.id}>
                                <SongDetail song={song} songs={songs}/>
                            </div>
                        ))}
                    </section>
                </main>
            </>
        )
    )
}