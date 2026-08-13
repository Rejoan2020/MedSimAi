import React from 'react'

export default function Card({ icon: Icon, title, options }) {
  return (
    <div>
      <div className='flex gap-2 items-center'>
        <Icon className='w-4 h-4'/>
        <div>{title}</div>
      </div>
      <div className='border'>
        {options[0]}
      </div>
    </div>
  )
}
