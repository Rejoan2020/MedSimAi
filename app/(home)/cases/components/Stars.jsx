import React from 'react'
import { Star } from 'lucide-react'

export default function Stars({filled}) {
  return (
    <div className='flex'>
      <Star color="#eab308" fill="#eab308" size={24}/>
      <Star color="#eab308" fill="#eab308" size={24}/>
      <Star color="#eab308" fill="#eab308" size={24}/>
      <Star/>
      <Star/>
    </div>
  )
}
