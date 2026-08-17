import React from 'react'

export default function Levels({title}) {
  return (
    <div className='p-4 border rounded-full px-6 text-white hover:bg-light-blue cursor-pointer bg-deep-blue'> 
      {title}
    </div>
  )
}
