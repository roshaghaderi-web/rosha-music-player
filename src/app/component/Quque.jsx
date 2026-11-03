'use client'

import Image from 'next/image'
import React from 'react'
import { songs } from '../../data/song'

export default function Quque() {
    return (
        <section className='w-[300px] h-[550px] fixed top-5 right-10 z-50 rounded-2xl border border-emerald-300/[0.16] bg-gradient-to-br from-[#112436]/[0.99] via-[#0a1928]/[0.99] to-[#070e19]/[0.99] backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.55),0_0_35px_rgba(16,185,129,0.055),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden'>

            <div className='absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.35)]'></div>

            <div className='absolute top-0 right-0 w-40 h-40 bg-emerald-400/[0.08] blur-[65px] pointer-events-none'></div>

            <div className='absolute bottom-16 left-0 w-32 h-32 bg-cyan-400/[0.06] blur-[55px] pointer-events-none'></div>

             <h4 className='text-white text-[13px] font-semibold tracking-[1.5px] absolute top-6 left-5 flex items-center gap-3'>
            <span className='relative flex items-center justify-center w-2.5 h-2.5'>
                <span className='absolute w-full h-full rounded-full bg-emerald-400/40 animate-ping'></span>
                <span className='relative w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.95)]'></span>
            </span>
            MUSIC SUGGESTIONS
        </h4>

            <div className='absolute top-[55px] left-5 right-5 h-px bg-gradient-to-r from-emerald-300/30 via-white/[0.08] to-transparent'></div>

            <div className='w-full h-[500px] relative top-9 flex flex-wrap *:w-full py-6 px-3 *:h-[60px] gap-2'>

                {songs.slice(0, 7).map((song, index) => (
                    <div
                        key={song.id ?? index}
                        onClick={() => {
                            window.dispatchEvent(
                                new CustomEvent('play-select-song', {
                                    detail: song.id
                                })
                            )
                        }}
                        className='relative flex items-center gap-3 px-3 rounded-xl border border-white/[0.045] bg-gradient-to-r from-white/[0.035] to-transparent transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-300/20 hover:translate-x-1 hover:shadow-[0_5px_20px_rgba(0,0,0,0.2)] group cursor-pointer'
                    >
                        <div className='absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-emerald-300 opacity-40 group-hover:opacity-100 shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all duration-300'></div>

                        <div className='relative shrink-0 rounded-lg'>
                            <div className='absolute -inset-[2px] rounded-[10px] bg-gradient-to-br from-emerald-300/35 via-white/10 to-transparent blur-[3px] opacity-70'></div>

                            <Image
                                src={song.cover || '/neon.png'}
                                alt={song.title || 'Song cover'}
                                width={50}
                                height={50}
                                className='relative w-[48px] h-[48px] object-cover rounded-lg border border-white/[0.16] bg-white/[0.06] shadow-[0_4px_14px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:border-emerald-300/40'
                            />

                            <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                                <span className='text-white text-base drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'>▶</span>
                            </div>
                        </div>

                        <div className='flex-1 min-w-0'>
                            <p className='text-white text-[12px] font-semibold truncate transition-colors duration-300 group-hover:text-emerald-200'>
                                {song.title}
                            </p>

                            <p className='text-white/50 text-[10px] truncate mt-1 transition-colors duration-300 group-hover:text-white/75'>
                                {song.artist}
                            </p>
                        </div>

                        <span className='text-white/45 text-[10px] font-medium shrink-0 tabular-nums transition-colors duration-300 group-hover:text-emerald-200'>
                            {song.duration || ''}
                        </span>
                    </div>
                ))}

            </div>

            <div className='absolute bottom-0 left-0 right-0 h-[55px] bg-gradient-to-t from-[#08111d] via-[#08111d]/90 to-transparent pointer-events-none'></div>

            

        </section>
    )
}