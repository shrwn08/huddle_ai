import React from 'react'
import emp from "../../assets/emp.jpg"

function RightChat() {
   return (
    <div className='w-64 h-24  rounded-md border border-[#62c6aa] p-2'>
    
    <div className='w-full h-full rounded-md bg-[#d7ebfa] flex items-center  p-2'> 
        
        <div className='w-12 h-12 rounded-full overflow-hidden bg-amber-500'>
            <img src={emp} alt='emp' /> 
        </div>
        <div className='w-3/4 h-12   p-2'>
            <p className="text-[11px] font-semibold"><span className='text-[#0291fA]'>@Ashvin </span>can you summarize the thread so far?</p>
        </div>
    </div>
    </div>
  )
}

export default RightChat