import React from 'react'

// Horizontal bar for a section score out of 10
export default function PerformanceIndicator({ score }) {
  const percentage = Math.max(0, Math.min(100, score * 10));
  return (
    <div
      className='h-2.5 w-full rounded-full'
      role='img'
      aria-label={`${score} out of 10`}
      style={{
        background: `linear-gradient(
          to right,
          var(--color-light-blue) 0 ${percentage}%,
          var(--color-brand-secondary) ${percentage}% 100%
        )`,
      }}
    />
  )
}
