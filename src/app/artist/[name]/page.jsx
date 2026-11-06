
'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Play, Music2 } from 'lucide-react'
import { songs } from '../../../data/song'

const artists = {
    ebi: {
        name: 'Ebi',
        artistName: 'Ebi',
    },
    ghomayshi: {
        name: 'Ghomayshi',
        artistName: 'Ghomayshi',
    },
    moein: {
        name: 'Moein',
        artistName: 'Moein',
    },
    yeganeh: {
        name: 'Yeganeh',
        artistName: 'Yegane',
    },
}

export default function ArtistPage() {
    const { name } = useParams()
    const router = useRouter()

    const artist = artists[name]

    const artistSongs = artist
        ? songs.filter(song => song.artist === artist.artistName).slice(0, 6)
        : []

    function playSong(song) {
        window.dispatchEvent(
            new CustomEvent('play-select-song', {
                detail: song.id,
            })
        )
    }

    if (!artist) {
        return (
            <main className="min-h-screen bg-[#07131d] p-8 text-white">
                <p className="text-white/60">Artist not found!</p>

                <button
                    onClick={() => router.back()}
                    className="mt-4 flex items-center gap-2 text-white/70 hover:text-white"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            </main>
        )
    }

   
return (
  <main className="relative min-h-screen overflow-hidden bg-[#050d14] px-6 pb-32 pt-7 text-white sm:px-10 lg:px-12">

    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-36 left-[15%] h-[430px] w-[430px] rounded-full bg-[#8CFF80]/[0.07] blur-[130px]" />
      <div className="absolute right-[-180px] top-[380px] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.04] blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#03080d]/80" />
    </div>

    <div className="relative z-10 mx-auto max-w-6xl">

      <button
        onClick={() => router.back()}
        className="group mb-8 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm text-white/50 backdrop-blur-xl transition-all duration-300 hover:border-[#8CFF80]/25 hover:bg-white/[0.06] hover:text-white"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Back
      </button>

<section className="relative mb-8 overflow-hidden rounded-[24px] border border-white/[0.08] bg-gradient-to-br from-[#14252b] via-[#0b1921] to-[#071018] p-5 sm:p-7">

  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#8CFF80]/[0.05] via-transparent to-transparent" />

  <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-[#8CFF80]/[0.06] blur-[80px]" />

  <div className="relative flex items-center gap-5 sm:gap-7">

    
<div className="group relative shrink-0">
  <div className="absolute -inset-3 rounded-3xl bg-[#8CFF80]/10 blur-xl transition-opacity duration-500 group-hover:bg-[#8CFF80]/15" />

  <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-white/15 shadow-2xl sm:h-40 sm:w-40">
    <Image
      src={
        name === 'ebi'
          ? '/cover/ebi.png'
          : name === 'ghomayshi'
          ? '/cover/ghomeyshi.png'
          : name === 'moein'
          ? '/cover/moein.png'
          : '/cover/yeganeh.png'
      }
      alt={artist.name}
      width={160}
      height={160}
      priority
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  </div>
</div>


    <div className="min-w-0 flex-1">

      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#8CFF80] shadow-[0_0_8px_#8CFF80]" />

        <span className="text-[9px] font-medium tracking-[3px] text-[#8CFF80]/75">
          ARTIST COLLECTION
        </span>
      </div>

      <h1 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
        {artist.name}
      </h1>

      <p className="mt-2 text-xs leading-5 text-white/40 sm:text-sm">
        A collection of timeless melodies.
      </p>

      <div className="mt-4 flex items-center gap-3 text-[11px] text-white/40">
        <span className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5">
          {artistSongs.length} tracks
        </span>

        <span className="h-1 w-1 rounded-full bg-white/20" />

        <span>Curated for you</span>
      </div>

    </div>
  </div>
</section>


      <div className="mb-5 flex items-end justify-between px-1">
        <div>
          <p className="mb-2 text-[10px] tracking-[3px] text-[#8CFF80]/55">
            YOUR SELECTION
          </p>

          <h2 className="text-xl font-medium tracking-wide text-white/90">
            All tracks
          </h2>
        </div>

        <span className="pb-1 text-xs tabular-nums text-white/30">
          {String(artistSongs.length).padStart(2, '0')} songs
        </span>
      </div>

      <div className="space-y-2">
        {artistSongs.map((song, index) => (
          <button
            key={song.id}
            onClick={() => playSong(song)}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-transparent px-3 py-3 text-left transition-all duration-300 hover:border-white/[0.07] hover:bg-white/[0.045] sm:gap-5 sm:px-5"
          >
            <span className="w-5 shrink-0 text-center text-xs tabular-nums text-white/30 transition-colors group-hover:text-[#8CFF80]">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] shadow-lg sm:h-[62px] sm:w-[62px]">
              <Image
                src={song.cover}
                alt={song.title}
                width={62}
                height={62}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Play size={19} fill="white" className="text-white" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-[#d9ffcf] sm:text-[15px]">
                {song.title.replaceAll('_', ' ')}
              </p>

              <p className="mt-1.5 truncate text-xs text-white/35 transition-colors group-hover:text-white/50">
                {artist.name}
              </p>
            </div>

            <div className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.07] text-white/25 transition-all duration-300 group-hover:border-[#8CFF80]/20 group-hover:bg-[#8CFF80]/10 group-hover:text-[#8CFF80]">
              <Play size={15} fill="currentColor" />
            </div>
          </button>
        ))}
      </div>

      {artistSongs.length === 0 && (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-12 text-center">
          <p className="text-sm text-white/45">
            No tracks found for this artist.
          </p>
        </div>
      )}

    </div>
  </main>
)
}