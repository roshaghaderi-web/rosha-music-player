
'use client'
import React, { useState, useRef, useEffect } from 'react'
import {
  Shuffle, SkipBack, Pause, Play, SkipForward, Repeat, Volume2, Heart, MoreHorizontal, Maximize, ListMusic, SlidersHorizontal
} from 'lucide-react'
import Image from 'next/image'
import { songs } from '../../data/song'
import { getLikedSongIds, toggleLikedSong } from '../lib/likedsongs'
export default function Player() {



  const [play, setplay] = useState(false)
  const [thisSong, setthisSong] = useState(0)
  const currentSong = songs[thisSong] || songs[0]
  const audioref = useRef(null)
  const [repeat, setrepeat] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setvolume] = useState(0.7)
  const [isLiked, setIsLiked] = useState(false)

  const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)

        return `${minutes}:${String(seconds).padStart(2, '0')}`
    }       

    ////////////////////////////////
  const handeleplay = () => {
    if (!audioref.current) return

    if (audioref.current.paused) {
      audioref.current.play()
        .then(() => setplay(true))
        .catch(() => setplay(false))
    } else {
      audioref.current.pause()
      setplay(false)
    }
  }

  ////////////////////////////
  const handelenext = () => {
    if (thisSong < songs.length - 1) {
      setthisSong(thisSong + 1)
    } else {
      setthisSong(0)

    }
    setplay(true)
    console.log(thisSong);

  }
  /////////////////////////////
  const handeleprev = () => {
    if (thisSong > 0) {
      setthisSong(thisSong - 1)

    } else {
      setthisSong(songs.length - 1)
    }
    setplay(true)
  }
  //////////////////////////////
  const handleshuffle = () => {
    const random = Math.floor(Math.random() * songs.length)
    setthisSong(random)
    setplay(true)
  }
  //////////////////////////
  const handlerepeat = () => {
    setrepeat(!repeat)
  }
  /////////////////////

  const handlevolume = (e) => {
    const newvolume = Number(e.target.value)
    setvolume(newvolume)

    if (audioref.current) {
      audioref.current.volume = newvolume
    }
  }

  ///////////////////
  const handeleseek = (e) => {
    const newtime = Number(e.target.value)
    if (audioref.current) {
      audioref.current.currentTime = newtime
      setCurrentTime(newtime)
    }
  }


  const handelelike = () => {
    if (!currentSong?.id) return
    toggleLikedSong(currentSong.id)

  }

  ////////////////////
  useEffect(() => {
    if (!audioref.current) return

    if (play) {
      audioref.current.play().catch(() => {
        setplay(false)
      })
    } else {
      audioref.current.pause()
    }
  }, [thisSong, play])

  useEffect(() => {
    if (!audioref.current) return
    audioref.current.volume = volume
  }, [volume])


  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
  }, [currentSong.id])

  useEffect(() => {
    if (!currentSong?.id) return

    window.dispatchEvent(
      new CustomEvent('play-song-changed', {
        detail: currentSong.id,
      })
    )
  }, [currentSong?.id])



  useEffect(() => {
    const handlePlaySelectSong = (event) => {
      const selectedIndex = songs.findIndex(
        (song) => song.id === event.detail
      )
      if (selectedIndex !== -1) {
        setthisSong(selectedIndex)
        setplay(true)
      }
    }
    window.addEventListener(
      'play-select-song',
      handlePlaySelectSong
    )
    return () => {
      window.removeEventListener(
        'play-select-song',
        handlePlaySelectSong
      )
    }
  }, [])

  useEffect(() => {
    if (!currentSong?.id) return
    const checklike = () => {
      const likedsong = getLikedSongIds()
      setIsLiked(likedsong.includes(currentSong.id))
    }
    checklike()
    window.addEventListener('liked-songs-changed',
      checklike
    )

    return () => {
      window.removeEventListener(
        'liked-songs-changed',
        checklike
      )
    }
  }, [currentSong?.id])



  useEffect(() => {

    const handlePlayerControl = (event) => {
      const { action, value } = event.detail || {}

      switch (action) {

        case 'play':
          setplay(prev => !prev)
          break

        case 'next':
          setthisSong(prev => (prev + 1) % songs.length)
          setplay(true)
          break

        case 'prev':
          setthisSong(prev =>
            prev > 0 ? prev - 1 : songs.length - 1
          )
          setplay(true)
          break

        case 'shuffle':
          setthisSong(prev => {
            if (songs.length < 2) return prev

            let random
            do {
              random = Math.floor(Math.random() * songs.length)
            } while (random === prev)

            return random
          })
          setplay(true)
          break

        case 'repeat':
          setrepeat(prev => !prev)
          break

        case 'seek':
          if (audioref.current && audioref.current.duration) {
            audioref.current.currentTime = value
            setCurrentTime(value)
          }
          break

      }
    }

    window.addEventListener('player-control', handlePlayerControl)

    return () => {
      window.removeEventListener('player-control', handlePlayerControl)
    }

  }, [])



  useEffect(() => {

    window.dispatchEvent(
      new CustomEvent('player-state-changed', {
        detail: {
          songId: currentSong.id,
          playing: play,
          repeat: repeat,
          currentTime: currentTime,
          duration: duration
        }
      })
    )

  }, [currentSong.id, play, repeat, currentTime, duration])
  ////////////////////////////




  return (
    <section className='fixed w-[1450px] left-[35px]  bg-gradient-to-r from-[#102b38]/95 via-[#081923]/90 to-[#07131d]/95 rounded-2xl h-[100px] z-50 border border-white/15 bottom-1 backdrop-blur-3xl shadow-[0_-18px_50px_rgba(0,0,0,0.7),0_0_45px_rgba(49,233,129,0.08),inset_0_1px_0_rgba(255,255,255,0.13),inset_0_-1px_0_rgba(49,233,129,0.08)] overflow-hidden'>


      <audio
        ref={audioref}
        src={currentSong.src}
        preload="auto"

        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration)
          setCurrentTime(e.currentTarget.currentTime)
        }}

        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime)
        }}

        onPlay={() => setplay(true)}
        onPause={() => setplay(false)}

        onEnded={() => {
          if (repeat) {
            audioref.current.currentTime = 0
            audioref.current.play().catch(() => setplay(false))
          } else {
            setplay(false)
          }
        }}
      />


      <div className='absolute left-[-80px] top-[-120px] w-[420px] h-[300px] rounded-full bg-[#31e981]/10 blur-[70px] pointer-events-none'></div>
      <div className='absolute left-[280px] top-[-100px] w-[280px] h-[220px] rounded-full bg-[#4bd9e8]/[0.06] blur-[65px] pointer-events-none'></div>
      <div className='absolute left-0 top-0 w-[520px] h-full bg-gradient-to-r from-[#173d4d]/35 via-[#0d2834]/15 to-transparent pointer-events-none'></div>

      <div className='absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
      <div className='absolute bottom-0 left-0 w-[520px] h-[2px] bg-gradient-to-r from-[#31e981]/70 via-[#4bd9e8]/20 to-transparent shadow-[0_0_12px_rgba(49,233,129,0.35)]'></div>

      <Image
        src={currentSong.cover} alt={currentSong.title} width={70} height={75} className='absolute left-3 rounded-[10px] top-[8px] w-[70px] z-50 h-[80px] object-cover shadow-[0_0_22px_rgba(49,233,129,0.18)] ring-1 ring-white/10' />

      <div className='w-[200px] h-[80px] absolute left-[100px] flex justify-between top-[17px]'>
        <div>
          <h3 className="text-[17px] text-white">
            {currentSong.title.replaceAll('_', ' ')}
          </h3>
          <h4 className="text-[12px] text-white/60">
            {currentSong.artist}
          </h4>
        </div>

        <Heart size={18} onClick={handelelike} strokeWidth={1.8} fill={isLiked ? '#31e981' : 'none'} color={isLiked ? '#31e981' : 'white'} className='text-[#31e981] mt-5 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_9px_rgba(49,233,129,0.65)]' />

        <MoreHorizontal size={21} strokeWidth={2} className='text-white/50 mt-5 transition-all duration-300 group-hover:text-white hover:text-white' />
      </div>

      <div className="absolute bottom-[30px] right-[450px] w-[490px] h-[58px] z-50 flex items-center justify-center gap-10 rounded-4xl">

        <Shuffle onClick={handleshuffle}
          size={18} className="text-[#31e981]/70 hover:text-[#8CFF80] cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(140,255,128,0.8)]" />

        <SkipBack size={20} onClick={handeleprev}
          className="text-white/65 hover:text-white hover:scale-110 cursor-pointer transition-all duration-300" />

        <button onClick={handeleplay}
          className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white text-[#07131d] shadow-[0_0_20px_rgba(255,255,255,0.15),0_0_35px_rgba(49,233,129,0.12)] hover:bg-[#8CFF80] hover:shadow-[0_0_25px_rgba(140,255,128,0.5),0_0_50px_rgba(49,233,129,0.18)] hover:scale-110 active:scale-95 transition-all duration-300">

          {play ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )
          }

        </button>

        <SkipForward onClick={handelenext}
          size={20} className="text-white/65 hover:text-white hover:scale-110 cursor-pointer transition-all duration-300" />

        <Repeat onClick={handlerepeat}
          size={18} className={`${repeat ? 'text-[#8CFF80]' : 'text-white/70'}  hover:scale-110 hover:text-white  cursor-pointer transition-colors `} />

      </div>


      <div className="w-[450px] absolute z-50 right-[470px] top-[60px]">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={handeleseek}
          className="w-full h-[4px] appearance-none cursor-pointer rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[11px] [&::-webkit-slider-thumb]:h-[11px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#43ed91] [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-[#43ed91]/10 [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(67,237,145,0.9),0_0_18px_rgba(67,237,145,0.45)]"
          style={{
            background: `linear-gradient(to right, #4bd9e8 0%, #31e981 ${duration ? (currentTime / duration) * 100 : 0
              }%, rgba(255,255,255,0.15) ${duration ? (currentTime / duration) * 100 : 0
              }%, rgba(255,255,255,0.15) 100%)`,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      <div className='w-[450px] h-[20px] z-50 mt-[80px] ml-[529px]'>

        <div className='flex justify-between items-center text-white/65 *:text-[10px]'>

          <h5>{formatTime(currentTime)}</h5>
          <h5>{formatTime(duration)}</h5>

        </div>

      </div>
      <div className='w-[200px] h-[20px] mt-[10px] mr-[40px] z-50 flex justify-between'>

        <Volume2
          size={20}
          fill="currentColor"
          className='text-white/70 absolute right-[370px] top-[39px] hover:text-[#8CFF80] hover:scale-110 hover:drop-shadow-[0_0_9px_rgba(140,255,128,0.6)] transition-all'
        />

        <div className='w-[120px] h-[3px] border border-white/10 bg-white/[0.13] absolute z-50 right-[220px] top-[47px] rounded-full'>

          <div
            style={{
              width: `${volume * 120}px`
            }}
            className='h-[4px] border mt-[-1px] border-[#31e981] relative bg-gradient-to-r from-[#4bd9e8] to-[#31e981] rounded-full shadow-[0_0_9px_rgba(49,233,129,0.45)]'>

            <div className='h-[10px] w-[10px] absolute right-[-2px] top-[-4px] rounded-full bg-[#43ed91] shadow-[0_0_9px_rgba(67,237,145,0.8)]'></div>

          </div>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handlevolume}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

      </div>

      <div className='flex gap-10 absolute top-[40px] right-6'>

        <SlidersHorizontal
          size={22}
          className='text-white/50 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_9px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer'
        />

        <ListMusic
          size={22}
          className='text-white/50 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_9px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer'
        />

        <Maximize
          size={22}
          className='text-white/50 hover:text-[#8CFF80] hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(140,255,128,0.6)] transition-all duration-300 cursor-pointer'
        />

      </div>

    </section>
  )
}
