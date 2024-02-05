interface Song {
    title: string,
    songFile: File
}

interface SongResponse {
    id: string,
    albumId: string,
    title: string,
    songPath: string,
    album: AlbumResponse
}