'use client'
import { Home, Search, Library, Heart, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchSongs from './Search'
export default function Slider() {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    return (
        <>
            <section className="w-[190px] h-screen border-r border-white/10 fixed z-50 bg-gradient-to-b from-[#07131d] via-[#081923] to-[#03080d] px-5 py-7 text-white shadow-[10px_0_40px_rgba(0,0,0,0.25)]">
                <Image src="/icon.png" alt="logo" width={40} height={40} loading="eager" />

                <nav className="mt-[50px] *:rounded-2xl gap-y-3.5 *:h-[50px] text-center **:flex **:items-center **:justify-start *:p-3 *:cursor-pointer **:gap-2 text-white/55">
                    <div className="text-[#8CFF80] bg-[#8CFF80]/10 hover:bg-[#8CFF80]/15 transition-all font-medium tracking-wide">
                        <Home />
                        Home
                    </div>

                    <div onClick={() => setShowSearch(true)} className="text-white/55 hover:text-[#8CFF80] hover:bg-white/5 transition-all font-medium tracking-wide">
                        <Search />
                        Search
                    </div>

                    <div onClick={() => router.push('./allsongs')} className="text-white/55 hover:text-[#8CFF80]  hover:bg-white/5 transition-all font-medium tracking-wide">
                        <Library />
                        Your library
                    </div>

                    <div onClick={() => router.push('/likedsongs')} className="text-white/55 hover:text-[#8CFF80] hover:bg-white/5 transition-all font-medium tracking-wide">
                        <Heart />
                        Liked song
                    </div>
                </nav>

                <div className='mt-5 flex justify-center items-center w-[150px] h-0 border border-white/10'></div>

                <p className='text-white/25 text-[10px] mt-1 flex justify-between w-[160px] tracking-[1.5px] font-medium'>
                    PLAY LIST <Plus size={15} className="text-white/40 hover:text-[#8CFF80] transition-all cursor-pointer" />
                </p>

                <div className="flex flex-wrap mt-0 gap-0">

                    <div onClick={() => router.push('/artist/ebi')} className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-white/5 transition-all  cursor-pointer">
                        <Image src="/cover/ebi.png" alt="Midnight Drive" width={45} height={45} className="rounded-lg border border-white/20 object-cover" />
                        <div>
                            <p className="text-[12px] font-medium tracking-wide text-white/70">Ebi</p>
                            <p className="text-[10px] font-medium text-white/30">18 songs</p>
                        </div>
                    </div>

                    <div onClick={() => router.push('/artist/ghomayshi')} className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-white/5 transition-all cursor-pointer">
                        <Image src="/cover/ghomeyshi.png" alt="Velvet Nights" width={45} height={45} className="rounded-lg border border-white/20 object-cover" />
                        <div>
                            <p className="text-[12px] font-medium tracking-wide text-white/70">Ghomeyshi</p>
                            <p className="text-[10px] font-medium text-white/30">24 songs</p>
                        </div>
                    </div>

                    <div onClick={() => router.push('/artist/yeganeh')} className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-white/5 transition-all cursor-pointer">
                        <Image src="/cover/yeganeh.png" alt="Neon Dreams" width={45} height={45} className="rounded-lg border border-white/20 object-cover" />
                        <div>
                            <p className="text-[12px] font-medium tracking-wide text-white/70">Yeganeh</p>
                            <p className="text-[10px] font-medium text-white/30">16 songs</p>
                        </div>
                    </div>

                    <div onClick={() => router.push('/artist/moein')} className="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-white/5 transition-all cursor-pointer">
                        <Image src="/cover/moein.png" alt="Golden Memories" width={45} height={45} className="rounded-lg border border-white/20 object-cover" />
                        <div>
                            <p className="text-[12px] font-medium tracking-wide text-white/70">Moein</p>
                            <p className="text-[10px] font-medium text-white/30">15 songs</p>
                        </div>
                    </div>

                </div>

            </section >


            {showSearch && (
                <SearchSongs
                    onClose={() => setShowSearch(false)}
                />
            )}
        </>

    )
}