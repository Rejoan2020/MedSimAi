import React from 'react'

export default function Tab({number, title}) {
  return (
    <div className='bg-brand-primary flex items-center gap-2 p-1 h-11 w-93 rounded-full'>
        <div className='border border-brand-primary h-6 w-6 flex justify-center items-center rounded-full bg-white'>{number}</div>
        <div className='text-Secondary-Text'>{title}</div>
    </div>
  )
}
