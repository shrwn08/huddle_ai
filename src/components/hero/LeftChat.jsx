import React from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import emp from "../../assets/emp.jpg"

function LeftChat() {
  return (
    <div className='w-60 h-24  rounded-md border border-[#62c6aa] p-2'>
    
    <div className='w-full h-full rounded-md bg-[#d7ebfa] flex items-center relative p-2'> 
        <span className="rotate-45  h-auto w-auto absolute right-1 top-0"><PushPinIcon sx={{fontSize: 14, color : "#62c6aa" }}/></span>
        <div className='w-12 h-12 rounded-full overflow-hidden bg-amber-500'>
            <img src={emp} alt='emp' /> 
        </div>
        <div className='w-3/4 h-12   p-2'>
            <p className="text-[9px] font-semibold">Vector search index is updating real-time via MongoDB Atlas streams.</p>
        </div>
    </div>
    </div>
  )
}

export default LeftChat