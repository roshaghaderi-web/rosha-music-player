import React from 'react'
const STORAGE_KEY = 'rosha-liked-songs'
export function getLikedSongIds() {
 if(typeof window==='undefined')return[]
 try{
    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)||'[]'
    )

 }catch{
    return[]
 }
}
export function toggleLikedSong(songId) {
    const likedsongs=getLikedSongIds()
    const isliked=likedsongs.includes(songId)
    const updatedsongs=isliked
    ? likedsongs.filter(id => id !== songId)
    :[...likedsongs,songId]
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedsongs)
    )
    window.dispatchEvent(
        new CustomEvent('liked-songs-changed')
    )
     return !isliked
}
