import React from 'react'

export default function Options({ number, selected = false, onClick, disabled = false }) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex h-10 flex-1 items-center justify-center rounded-md text-sm font-medium cursor-pointer disabled:cursor-not-allowed ${selected ? 'bg-light-blue text-white' : 'bg-gray-100 text-deep-blue hover:bg-gray-200'}`}
    >
      {number}
    </button>
  )
}
