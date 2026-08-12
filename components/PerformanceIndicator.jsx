import React from 'react'

export default function PerformanceIndicator({ score }) {
  const percentage = score * 10;
  return (
    <div className='border-0 w-152 h-4 rounded-lg'
      style={{
        background: `linear-gradient(
          to right,
          var(--color-light-blue) 0 ${percentage}%,
          var(--color-brand-secondary) ${percentage}% 100%
        )`,
      }}
    >
    </div>
  )
}
