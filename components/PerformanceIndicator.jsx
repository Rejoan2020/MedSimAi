import React from 'react'

export default function PerformanceIndicator({ score, color = 'var(--color-light-blue)' }) {
  const percentage = Math.max(0, Math.min(100, score * 10));
  return (
    <div
      className='h-2 w-full overflow-hidden rounded-full bg-brand-secondary/60'
      role='img'
      aria-label={`${score} out of 10`}
    >
      <div className='h-full rounded-full' style={{ width: `${percentage}%`, backgroundColor: color }} />
    </div>
  )
}
