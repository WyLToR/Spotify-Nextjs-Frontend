import {useRouter} from 'next/router';
import Role from "@/src/enums/roles";
import {AuthContext} from "@/src/contexts/AuthContext";
import UsersDetail from "@/components/admin/users";
import {useContext, useEffect} from "react";
import ArtistsDetail from "@/components/admin/artists";
import AlbumsDetail from "@/components/admin/albums";
import SongsDetail from "@/components/admin/songs";

export default function AdminPage() {
    const router = useRouter();
    const {auth} = useContext(AuthContext);
    useEffect(() => {
        if (!auth || auth.role !== Role.admin) {
            router.push('/');
        }
    }, [auth, router]);


    return (
        <>
            <div className="m-5">
                {<UsersDetail/>}
            </div>
            <div className="m-5">
                {<ArtistsDetail/>}
            </div>
            <div className="m-5">
                {<AlbumsDetail/>}
            </div>
            <div className="m-5">
                {<SongsDetail/>}
            </div>
        </>
    );
}
