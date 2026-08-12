import Image from 'next/image'
import React from 'react'

export default function Button({icon, title}) {
    // console.log('icon',icon)
  return (
    <div className='w-30 h-10 flex items-center justify-center gap-1 border border-[#6796F2] rounded-xl'>
        {icon?<Image width={24} height={24} src={icon} alt={title}/>:""}
        <div>{title}</div>
    </div>
  )
}
