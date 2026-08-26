import React from 'react'

export default function Levels({ title, difficulty, setDifficulty }) {
  return (
    <div
      className={`p-4 flex justify-center border rounded-full px-6 text-white hover:bg-light-blue ${difficulty===title?'bg-light-blue':'bg-deep-blue'} cursor-pointer`}
      onClick={() => setDifficulty(title)}
    >
      {title}
    </div>
  )
}
