'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { songs } from '../../data/song'
import {
    ArrowLeft, Bell, MoreHorizontal, Heart, AudioLines, BadgeCheck,
    Shuffle, SkipBack, Pause, SkipForward, Repeat, Volume2,
    SlidersHorizontal, ListMusic, Maximize, Play
} from 'lucide-react'

export default function Explore() {
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [repeat, setRepeat] = useState(false)


    const controlPlayer = (action, value) => {
        window.dispatchEvent(
            new CustomEvent('player-control', {
                detail: { action, value }
            })
        )
    }
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)

        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }
    const router = useRouter()
    const handelesongselect = (song) => {
        setCurrentSong(song)
        window.dispatchEvent(
            new CustomEvent('play-select-song',
                {
                    detail: song.id,
                }
            )
        )
    }

    useEffect(() => {

        const handlePlayerState = (event) => {
            const state = event.detail

            const song = songs.find(
                song => song.id === state.songId
            )

            if (song) {
                setCurrentSong(song)
            }

            setIsPlaying(state.playing)
            setRepeat(state.repeat)
            setCurrentTime(state.currentTime)
            setDuration(state.duration)
        }

        window.addEventListener(
            'player-state-changed',
            handlePlayerState
        )

        // درخواست وضعیت فعلی پلیر
        window.dispatchEvent(
            new CustomEvent('request-player-state')
        )

        return () => {
            window.removeEventListener(
                'player-state-changed',
                handlePlayerState
            )
        }

    }, [])






    console.log('Explore page loaded')

    ///////////////////////
    return (
        <section className="relative z-50 ml-[190px] w-[calc(100%-190px)] min-h-screen overflow-hidden">

            <Image
                src="/back2.png"
                alt="back"
                fill
                className="blur-[6px] object-cover scale-105 opacity-70 absolute h-full w-full"
                priority
            />

            <div className='relative w-full h-[100px] flex z-10'>

                <ArrowLeft
                    className='absolute left-[40px] top-[40px] text-white/65 hover:text-[#8CFF80] cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(140,255,128,0.45)]'
                    size={24}
                />

                <h3 className='absolute left-[80px] top-[40px] text-white/90 font-medium'>
                    Explore
                </h3>

                <Bell
                    className='absolute right-[450px] hover:text-[#8CFF80] cursor-pointer top-[40px] text-white/70 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(140,255,128,0.4)]'
                />

                <MoreHorizontal
                    className='absolute right-[410px] top-[40px] text-white/60 hover:text-white transition-all duration-300'
                />

            </div>

            {/* ////////////////////////////////// */}

            <div className="relative left-1/12 w-[800px] mt-[-20px] flex h-[350px] overflow-hidden rounded-[35px] border border-white/[0.18] bg-gradient-to-br from-[#10212b]/95 via-[#08131d]/95 to-[#080f18]/95 backdrop-blur-3xl shadow-[0_0_25px_rgba(255,255,255,0.10),0_0_55px_rgba(48,190,255,0.08),0_30px_80px_rgba(0,0,0,0.75)]">

                <div className="pointer-events-none absolute inset-0 z-20 rounded-[35px] overflow-hidden">

                    <div className="absolute -inset-[100%] animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(255,255,255,0.04)_315deg,rgba(80,220,255,0.55)_330deg,rgba(140,255,128,0.65)_345deg,rgba(255,255,255,0.8)_355deg,transparent_360deg)]" />

                    <div className="absolute inset-[2px] rounded-[33px] bg-gradient-to-br from-[#0c1b25]/97 via-[#08131d]/97 to-[#080f17]/98" />

                </div>

                <Image
                    src={currentSong.cover || '/cover.png'}
                    alt={currentSong.title}
                    width={250}
                    height={350}
                    priority
                    className="absolute   left-[4px] top-[3.5px] bottom-[4px] z-30 w-[248px] h-[342px] object-cover rounded-[30px] border-1  border-white/10"
                />

                <h4 className='gap-2 absolute flex top-[50px] left-[280px] text-[10px] font-semibold tracking-[2px] text-white/40 z-50'>

                    <AudioLines
                        size={30}
                        strokeWidth={2.5}
                        className='mt-[-10px] text-[#35e67b] drop-shadow-[0_0_8px_rgba(53,230,123,0.55)]'
                    />

                    PLAYING FROM ALBUM

                </h4>

                <h1 className='flex items-center justify-between absolute top-[70px] left-[280px] w-[500px] h-[40px] text-[27px] font-semibold tracking-[-0.5px] text-white z-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'>
                    {currentSong.title.replaceAll('_', ' ')}


                    <div className='flex items-center gap-3'>

                        <button className='group flex items-center justify-center w-[38px] h-[38px] rounded-full border border-white/[0.18] bg-white/[0.045] backdrop-blur-md transition-all duration-300 hover:border-[#8CFF80]/40 hover:bg-[#8CFF80]/[0.08] hover:shadow-[0_0_20px_rgba(140,255,128,0.18)] hover:scale-105'>

                            <Heart
                                size={19}
                                strokeWidth={1.8}
                                fill='currentColor'
                                className='text-[#31e981] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_7px_rgba(49,233,129,0.4)]'
                            />

                        </button>

                        <button className='group flex items-center justify-center w-[38px] h-[38px] rounded-full border border-white/[0.18] bg-white/[0.045] backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.09] hover:shadow-[0_0_18px_rgba(255,255,255,0.08)] hover:scale-105'>

                            <MoreHorizontal
                                size={21}
                                strokeWidth={2}
                                className='text-white/55 transition-all duration-300 group-hover:text-white'
                            />

                        </button>

                    </div>

                </h1>

                <h3 className='flex absolute top-[110px] left-[280px] text-[13px] font-medium text-white/40 tracking-wide z-50'>

                    {currentSong.artist}

                    <BadgeCheck
                        size={18}
                        strokeWidth={2.5}
                        fill='#31e981'
                        className='text-[#07120A] top-1.5 drop-shadow-[0_0_6px_rgba(49,233,129,0.45)]'
                    />

                </h3>


                <div className="absolute z-50 right-[50px] top-[150px] w-[450px] h-[4px] rounded-full bg-white/20">

                    <div
                        className="relative h-full rounded-full bg-gradient-to-r from-[#31c8e9] to-[#31e981] shadow-[0_0_8px_rgba(49,233,129,0.45)]"
                        style={{
                            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
                        }}
                    >

                 
                        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 h-[12px] w-[12px] rounded-full bg-[#43ed91] shadow-[0_0_10px_rgba(67,237,145,0.8),0_0_20px_rgba(67,237,145,0.35)]" />

                    </div>

                    <input
                        type="range"
                        min={0}
                        max={duration || 1}
                        step={0.1}
                        value={duration > 0 ? Math.min(currentTime, duration) : 0}
                        onChange={(e) => controlPlayer('seek', Number(e.target.value))}
                        className="absolute inset-0 z-10 w-full h-[12px] -top-[4px] cursor-pointer opacity-0"
                    />

                </div>


                <div className='w-[450px] h-[20px] z-50 mt-[163px] ml-[298px]'>

                    <div className='flex justify-between items-center *:text-white/65 *:text-[12px]'>

                        <h5>{formatTime(currentTime)}</h5>
                        <h5>{formatTime(duration)}</h5>

                    </div>

                </div>

                <div className="absolute bottom-[100px] right-[30px] w-[490px] h-[58px] z-50 flex items-center justify-center gap-10 rounded-4xl">

                    <Shuffle
                        onClick={() => controlPlayer('shuffle')}
                        size={23}
                        className="text-[#31e981]/70 hover:text-[#8CFF80] cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(140,255,128,0.6)]"
                    />

                    <SkipBack
                        onClick={() => controlPlayer('prev')}
                        size={25}
                        className="text-white/65 hover:text-white cursor-pointer transition-all duration-300"
                    />

                    <button onClick={() => controlPlayer('play')} className="flex items-center justify-center w-[55px] h-[55px] rounded-full bg-white text-[#07131d] shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:bg-[#8CFF80] hover:shadow-[0_0_30px_rgba(140,255,128,0.45)] hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        {isPlaying ? (
                            <Pause size={25} fill="currentColor" />
                        ) : (
                            <Play size={25} fill="currentColor" className="ml-1" />
                        )}
                    </button>

                    <SkipForward
                        onClick={() => controlPlayer('next')}
                        size={25}
                        className="text-white/65 hover:text-white cursor-pointer transition-all duration-300"
                    />

                    <Repeat
                        onClick={() => controlPlayer('repeat')}
                        size={23}
                        className={`cursor-pointer transition-all duration-300 ${repeat
                            ? 'text-[#8CFF80] drop-shadow-[0_0_8px_rgba(140,255,128,0.6)]'
                            : 'text-[#31e981]/70 hover:text-[#8CFF80]'
                            }`} />

                </div>
            </div>
            {/* ///////////////////////////////////////// */}
            <div className="flex justify-between mt-10 mb-4 w-[920px]">
                <h5 className="text-white relative left-[85px] text-[20px] font-semibold tracking-wide z-10"> All Songs</h5>
                <h5
                    onClick={() => router.push('/allsongs')}
                    className="mt-[3px] text-[15px] font-medium tracking-wide cursor-pointer animate-pulse z-50 text-[#8CFF80] font-bold hover:text-white/80 transition-all duration-300"
                >
                    See All
                </h5>
            </div>
            <div className="flex flex-wrap gap-3 w-[850px] mb-[150px] relative top-2 left-[80px]">
                {songs.slice(0, 10).map((song) => (
                    <div key={song.id} onClick={() => handelesongselect(song)} className="relative w-[160px] h-[220px] shrink-0 rounded-2xl border border-white/20 bg-gray-800/90 overflow-hidden cursor-pointer group">
                        <Image
                            src={song.cover}
                            alt={song.title}
                            width={160}
                            height={170}
                            className="w-[160px] h-[150px] hover:w-[170px] hover:h-[160px] transition-all object-cover rounded-2xl"
                        />
                        <div className="absolute top-[60px] left-[55px] bg-white/20 backdrop-blur-sm h-[50px] w-[50px] rounded-full flex items-center justify-center group-hover:bg-white/50 transition-all duration-300">
                            {isPlaying && currentSong.id === song.id ? (
                                <Pause size={25} />
                            ) : (
                                <Play size={25} className='ml-1' />
                            )}
                        </div>
                        <div className="px-2 pt-2">
                            <p className="text-white text-[13px] font-semibold truncate"> {song.title}</p>
                            <p className="text-white/60 text-[11px] mt-1 truncate">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}
