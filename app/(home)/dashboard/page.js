import React from 'react'
import Dashboard from './components/Dashboard'

export default async function page() {
  await dbconnect();
  return (
    <div className='flex justify-center'>
      <Dashboard />
    </div>
  )
}
