import React from 'react'
import Bot from "../../assets/chatbot.png"
import LeftChat from './LeftChat'
import LeftFeatureCard from './LeftFeatureCard'

function InfiniteCoverFlow() {
  return (
    <div className='w-11/12 '>
            {/**Mobile/tab view */}
            <div className='w-full flex justify-center items-center'>
                <img src={Bot} alt="bot" className='h-40'/>
            </div>
            <div>
                <LeftChat />
                <LeftFeatureCard />
            </div>
    </div>
  )
}

export default InfiniteCoverFlow