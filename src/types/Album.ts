import type Track from "./Track"

export default interface Album {
    id: string
    title: string
    cover_photo: string
    author: any,
    tracks: Track[],
}