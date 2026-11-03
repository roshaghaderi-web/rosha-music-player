'use client'

import { useState } from 'react'
import { Search, Play, X } from 'lucide-react'
import { songs } from '../../data/song'

export default function SearchSongs({ onClose }) {
  const [query, setQuery] = useState('')

  const filteredSongs = songs.filter((song) => {
    const title = song.title?.toLowerCase() || ''
    const artist = song.artist?.toLowerCase() || ''
    const searchText = query.trim().toLowerCase()

    return title.includes(searchText) || artist.includes(searchText)
  })

  const playSong = (song) => {
    window.dispatchEvent(
      new CustomEvent('play-select-song', {
        detail: song.id,
      })
    )

    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100]  flex items-start justify-center overflow-y-auto bg-[#02080c]/80 px-4 pb-8 pt-20 backdrop-blur-md sm:pt-28">

      {/* Ambient glow */}
      <div className="pointer-events-none fixed left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#31e981]/10 blur-[110px]" />

      <div className="relative h-[500px] w-full max-w-xl overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#07131d]/95 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9),0_0_50px_rgba(49,233,129,0.06)]">

        {/* Top neon line */}
        <div className="absolute left-[15%] top-0 h-px w-[70%] bg-gradient-to-r from-transparent via-[#31e981]/80 to-transparent" />

        {/* Header */}
        <div className="relative  flex items-center justify-between px-6 pb-5 pt-7 sm:px-8">

          <div className="flex  items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#31e981]/20 bg-gradient-to-br from-[#31e981]/15 to-[#31e981]/[0.03] shadow-[0_0_25px_rgba(49,233,129,0.08)]">
              <Search size={22} className="text-[#31e981]" strokeWidth={2} />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Find your sound
              </h2>

              <p className="mt-1 text-[11px] font-medium tracking-[2px] text-white/35">
                YOUR MUSIC UNIVERSE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close search"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/45 transition-all duration-300 hover:rotate-90 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search input */}
        <div className="px-6 sm:px-8">
          <div className="group relative rounded-2xl p-px transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-[#31e981]/60 focus-within:via-[#31e981]/20 focus-within:to-transparent">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#0b1b26] px-4 py-4 transition-all duration-300 group-focus-within:border-transparent group-focus-within:bg-[#0a1b25] group-focus-within:shadow-[0_0_30px_rgba(49,233,129,0.07)]">

              <Search
                size={20}
                className="shrink-0 text-white/35 transition-colors duration-300 group-focus-within:text-[#31e981]"
              />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Songs, artists, your next vibe..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30 sm:text-[15px]"
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="shrink-0 text-white/35 transition hover:text-[#31e981]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results heading */}
        <div className="flex items-center justify-between px-6 pb-3 pt-7 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-white/40">
            {query.trim() ? 'Search results' : 'Discover'}
          </p>

          {query.trim() !== '' && (
            <span className="rounded-full border border-[#31e981]/15 bg-[#31e981]/[0.06] px-3 py-1 text-[10px] font-medium text-[#31e981]/80">
              {filteredSongs.length} {filteredSongs.length === 1 ? 'TRACK' : 'TRACKS'}
            </span>
          )}
        </div>

        {/* Songs */}
        <div className="mx-3 mb-4 max-h-[360px] overflow-y-auto px-2 pb-2 sm:mx-5 sm:px-3">

          {query.trim() !== '' ? (
            filteredSongs.length > 0 ? (
              <div className="space-y-1">
                {filteredSongs.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => playSong(song)}
                    style={{ animationDelay: `${Math.min(index * 35, 250)}ms` }}
                    className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition-all duration-300 hover:border-white/[0.07] hover:bg-white/[0.045] active:scale-[0.99] sm:px-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#142c37] to-[#09141d] transition-all duration-300 group-hover:border-[#31e981]/25 group-hover:shadow-[0_0_18px_rgba(49,233,129,0.08)]">
                        <span className="text-sm font-semibold text-[#31e981]/70">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white/85 transition-colors duration-300 group-hover:text-[#31e981]">
                          {song.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/40 transition-colors group-hover:text-white/60">
                          {song.artist}
                        </p>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#31e981]/20 bg-[#31e981]/[0.07] text-[#31e981] opacity-70 shadow-[0_0_15px_rgba(49,233,129,0.03)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#31e981]/50 group-hover:bg-[#31e981] group-hover:text-[#07131d] group-hover:opacity-100 group-hover:shadow-[0_0_22px_rgba(49,233,129,0.2)]">
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                  <Search size={26} className="text-white/25" />
                </div>

                <p className="text-sm font-medium text-white/75">
                  No tracks found
                </p>

                <p className="mt-2 text-xs text-white/35">
                  Try another song or artist name
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#31e981]/15 bg-gradient-to-br from-[#31e981]/10 to-transparent">
                <div className="absolute inset-2 rounded-[20px] border border-white/[0.04]" />

                <Search
                  size={30}
                  strokeWidth={1.5}
                  className="text-[#31e981]/80"
                />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#07131d] bg-[#31e981] shadow-[0_0_12px_rgba(49,233,129,0.65)]" />
              </div>

              <p className="text-sm font-medium text-white/80">
                What are you in the mood for?
              </p>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.015] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#31e981] shadow-[0_0_8px_rgba(49,233,129,0.8)]" />
            <span className="text-[10px] font-medium tracking-[1.5px] text-white/35">
              YOUR SOUND. YOUR WORLD.
            </span>
          </div>

          <span className="text-[10px] tracking-wide text-white/25">
            MUSIC SEARCH
          </span>
        </div>
      </div>
    </div>
  )
}