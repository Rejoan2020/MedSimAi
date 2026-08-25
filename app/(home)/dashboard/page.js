import React from 'react'
import Dashboard from './components/Dashboard'
import { dbconnect } from '@/lib/mongo';

export default async function page() {
  await dbconnect();
  return (
    <div className='flex justify-center'>
      <Dashboard />
    </div>
  )
}
