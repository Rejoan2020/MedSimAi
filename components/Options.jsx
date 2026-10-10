import React from 'react'

export default function Options({ number, selected = false, onClick, disabled = false }) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`border-0 flex justify-center items-center h-12 w-19 rounded-sm cursor-pointer disabled:cursor-not-allowed ${selected ? 'bg-light-blue text-white' : 'bg-gray-100 text-[#243284] hover:bg-gray-200'}`}
    >
      {number}
    </button>
  )
}
