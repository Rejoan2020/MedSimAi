import React from 'react'
import { Star } from 'lucide-react'

const FILLED_BY_DIFFICULTY = { Beginner: 1, Intermediate: 3, Advanced: 5 };

export default function Stars({ difficulty }) {
  const filled = FILLED_BY_DIFFICULTY[difficulty] ?? 0;
  return (
    <div className='flex' title={difficulty}>
      {Array.from({ length: 5 }, (_, i) =>
        i < filled
          ? <Star key={i} color="#eab308" fill="#eab308" size={24} />
          : <Star key={i} size={24} />
      )}
    </div>
  )
}
