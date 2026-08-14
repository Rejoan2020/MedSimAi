'use client'
import { ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export default function Card({ icon: Icon, title, options }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full relative flex flex-col gap-1'>
      <div className='flex gap-2 items-center'>
        <Icon className='w-4 h-4' />
        <div>{title}</div>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='w-full border p-2 rounded-lg flex justify-between cursor-pointer'>
        <div>{options[0]}</div>
        <ChevronUp className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <div className={isOpen?'bg-white absolute left-0 top-full w-full':'hidden'}>
        {options.map((opt, index) =>
          <div className='border-0 text-deep-blue hover:text-light-blue m-1 flex justify-center cursor-pointer hover:bg-brand-primary bg-brand-secondary' key={index}>{opt}</div>)
        }
      </div>
    </div>
  )
}
