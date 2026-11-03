
'use client'
import Image from "next/image"
import { useState, useEffect } from 'react'
import { Play, Pause, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { songs } from '../../data/song'
import React from 'react'

export default function Allsong() {
    const router = useRouter()
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)

    const handleSongSelect = (song) => {
        setCurrentSong(song)
        setIsPlaying(true)

        window.dispatchEvent(
            new CustomEvent('play-select-song', {
                detail: song.id
            })
        )
    }

    useEffect(() => {
        const handleSongChange = (event) => {
            const selectedsong = songs.find(
                (song) => song.id === event.detail
            )

            if (selectedsong) {
                setCurrentSong(selectedsong)
                setIsPlaying(true)
            }
        }

        window.addEventListener('play-song-changed', handleSongChange)

        return () => {
            window.removeEventListener(
                'play-song-changed',
                handleSongChange
            )
        }
    }, [])

    ////////////////////////////
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#07131d] px-10 py-8">

            <Image
                src="/back2.png"
                alt="Background"
                fill
                priority
                className="fixed inset-0 -z-0 object-cover opacity-30 blur-[6px]"
            />

            <div className="relative z-10">

                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-3 text-white/70 transition hover:text-[#8CFF80]"
                >
                    <ArrowLeft size={23} />
                    Back
                </button>

                <h1 className="mb-2 text-3xl font-bold text-white">
                    All Songs
                </h1>

                <p className="mb-8 text-sm text-white/50">
                    {songs.length} songs in your library
                </p>

                <div className="flex flex-wrap gap-3 mb-[150px] relative top-2">

                    {songs.map((song) => (
                        <div
                            key={song.id}
                            onClick={() => handleSongSelect(song)}
                            className="relative w-[160px] h-[220px] shrink-0 rounded-2xl border border-white/20 bg-gray-800/90 overflow-hidden cursor-pointer group"
                        >

                            <Image
                                src={song.cover || '/cover.png'}
                                alt={song.title}
                                width={160}
                                height={170}
                                className="w-[160px] h-[150px] hover:w-[170px] hover:h-[160px] transition-all object-cover rounded-2xl"
                            />

                            <div className="absolute top-[60px] left-[55px] bg-white/20 backdrop-blur-sm h-[50px] w-[50px] rounded-full flex items-center justify-center group-hover:bg-white/50 transition-all duration-300">
                                {isPlaying && currentSong.id === song.id ? (
                                    <Pause size={25} />
                                ) : (
                                    <Play size={25} />
                                )}
                            </div>

                            <div className="px-2 pt-2">
                                <p className="text-white text-[13px] font-semibold truncate">
                                    {song.title}
                                </p>

                                <p className="text-white/60 text-[11px] mt-1 truncate">
                                    {song.artist}
                                </p>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
     
        </section>
    )
}
