import React from 'react'

export default function ResponsiveCircle({ percentage }) {
  return (
    <div
      className={`border-0 w-38 h-38 rounded-full flex justify-center items-center`}
      style={{
        background: `conic-gradient(
          var(--color-light-blue) 0 ${percentage}%,
          var(--color-brand-secondary) ${percentage}% 100%
        )`,
      }}>
      <div className='border-0 w-25 h-25 rounded-full flex justify-center items-center bg-white text-light-blue font-bold'>
        {percentage}%
      </div>
    </div>
  )
}
