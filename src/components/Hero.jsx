import React from 'react'
import InfiniteCoverFlow from './hero/InfiniteCoverFlow'
import BottomHero from './hero/BottomHero'

function Hero() {
  return (
    <div className='w-full h-1/2 flex-col flex gap-5 justify-center items-center'>
        <InfiniteCoverFlow />
        <BottomHero />
    </div>
  )
}

export default Hero