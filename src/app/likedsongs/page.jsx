'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Play, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { songs } from '../../data/song'
import { getLikedSongIds } from '../lib/likedsongs'

export default function LikedSongs() {
  const router = useRouter()

  const [likedSongs, setLikedSongs] = useState([])

  useEffect(() => {
    const updateLikedSongs = () => {
      const likedIds = getLikedSongIds()

      const filteredSongs = songs.filter(song =>
        likedIds.includes(song.id)
      )

      setLikedSongs(filteredSongs)
    }

    updateLikedSongs()

    window.addEventListener(
      'liked-songs-changed',
      updateLikedSongs
    )

    return () => {
      window.removeEventListener(
        'liked-songs-changed',
        updateLikedSongs
      )
    }
  }, [])

  const playSong = (song) => {
    window.dispatchEvent(
      new CustomEvent('play-select-song', {
        detail: song.id
      })
    )
  }


  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07131d] px-8 pb-32 pt-7 text-white">

      {/* Ambient background */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-emerald-500/[0.09] blur-[140px]" />
      <div className="pointer-events-none absolute left-[30%] top-[320px] h-[300px] w-[500px] rounded-full bg-teal-500/[0.04] blur-[120px]" />

      {/* Back */}
      <button
        onClick={() => router.back()}
        className="group relative z-10 mb-8 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-white/55 backdrop-blur-xl transition duration-300 hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:text-white"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back
      </button>


      {/* Minimal Luxury Hero */}
      <section className="relative mb-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-r from-[#0d211d] via-[#0b171b] to-[#081019] px-6 py-7 sm:px-8">

        {/* Soft ambient light */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-emerald-400/[0.08] blur-[85px]" />

        <div className="relative flex items-center gap-5 sm:gap-7">

          {/* Compact artwork */}
          <div className="group relative h-[100px] w-[100px] shrink-0 sm:h-[116px] sm:w-[116px]">

            <div className="absolute -inset-1 rounded-2xl bg-emerald-400/[0.10] blur-xl transition duration-500 group-hover:bg-emerald-400/20" />

            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b7552] to-[#0b2923] shadow-[0_12px_35px_rgba(0,0,0,0.25)]">

              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-black/30" />

              <Heart
                size={37}
                strokeWidth={1.5}
                fill="#d9ffea"
                color="#d9ffea"
                className="relative animate-heartbeat"
              />
            </div>
          </div>

          {/* Typography */}
          <div className="relative min-w-0">

            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#31e981] shadow-[0_0_8px_rgba(49,233,129,0.65)]" />
              <span className="text-[10px] font-medium uppercase tracking-[2.5px] text-[#8CFF80]/80">
                YOUR COLLECTION
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-1.2px] sm:text-4xl">
              Liked Songs
            </h1>

            <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
              <span>{likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}</span>
              <span className="text-white/20">/</span>
              <span>Your personal favorites</span>
            </div>

          </div>

        </div>
      </section>



      <section className="relative">

        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mt-[-20px] tracking-tight">
              Your favorites
            </h2>

          </div>

          <div className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 mt-[-20px] text-xs tabular-nums text-white/45">
            {String(likedSongs.length).padStart(2, "0")} TRACKS
          </div>
        </div>

        {/* Table header */}


        <div className="flex flex-col gap-1">

          {likedSongs.map((song, index) => (

            <div
              key={song.id}
              className="group relative grid grid-cols-[32px_minmax(0,1fr)_44px] items-center gap-4 overflow-hidden rounded-2xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-white/[0.07] hover:bg-white/[0.035]"
            >

              {/* Subtle hover accent */}
              <div className="pointer-events-none absolute bottom-3 left-0 top-3 w-[2px] rounded-full bg-[#31e981] opacity-0 shadow-[0_0_12px_#31e981] transition-opacity duration-300 group-hover:opacity-100" />

              <span className="relative text-sm tabular-nums text-white/30 transition group-hover:text-[#8CFF80]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex min-w-0 items-center gap-4">

                <div
                  onClick={() => playSong(song)}
                  className="relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-white/5 shadow-lg"
                >
                  <Image
                    src={song.cover || "/cover.png"}
                    alt={song.title || "Song cover"}
                    fill
                    sizes="56px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
                    <Play size={21} fill="white" color="white" />
                  </div>
                </div>

                <div
                  onClick={() => playSong(song)}
                  className="min-w-0 flex-1 cursor-pointer py-1"
                >
                  <p className="truncate text-sm font-medium text-white/85 transition-colors duration-200 group-hover:text-[#8CFF80]">
                    {song.title}
                  </p>

                  <p className="mt-1.5 truncate text-xs text-white/40 transition-colors group-hover:text-white/60">
                    {song.artist}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex h-9 w-9 items-center justify-center rounded-full transition duration-300 group-hover:bg-[#31e981]/[0.08]">
                  <Heart
                    size={20}
                    fill="#31e981"
                    color="#31e981"
                    strokeWidth={1.6}
                    className="transition duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

            </div>

          ))}

        </div>
      </section>


    </main>

  )
}
