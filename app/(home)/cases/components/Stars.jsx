import React from 'react'
import { Star } from 'lucide-react'

const FILLED_BY_DIFFICULTY = { Beginner: 1, Intermediate: 3, Advanced: 5 };

export default function Stars({ difficulty }) {
  const filled = FILLED_BY_DIFFICULTY[difficulty] ?? 0;
  return (
    <div className='flex' role='img' aria-label={`${difficulty}: ${filled} of 5`}>
      {Array.from({ length: 5 }, (_, i) =>
        i < filled
          ? <Star key={i} color="#eab308" fill="#eab308" className='h-4 w-4' />
          : <Star key={i} className='h-4 w-4 text-gray-300' />
      )}
    </div>
  )
}
