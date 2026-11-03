'use client'
import React from 'react'
import Slider from './component/slider'
import Explore from './component/Explore'

import Quque from './component/Quque'
export default function Page() {
  return (
    <div>
<main className='flex'>
  <Slider/>
  <Explore/>
  
  <Quque/>
</main>
    </div>
  )
}
