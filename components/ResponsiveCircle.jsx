import React from 'react'

// Donut chart for a 0-100 score
export default function ResponsiveCircle({ percentage }) {
  return (
    <div
      className='flex h-28 w-28 shrink-0 items-center justify-center rounded-full sm:h-32 sm:w-32'
      role='img'
      aria-label={`${percentage} out of 100`}
      style={{
        background: `conic-gradient(
          var(--color-light-blue) 0 ${percentage}%,
          var(--color-brand-secondary) ${percentage}% 100%
        )`,
      }}>
      <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white text-lg font-bold text-light-blue sm:h-24 sm:w-24'>
        {percentage}%
      </div>
    </div>
  )
}
