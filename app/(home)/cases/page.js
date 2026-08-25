import React from 'react'
import Cases from './components/Cases'
import { dbconnect } from '@/lib/mongo';

export default async function page() {
  await dbconnect();
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cases`);
  const data = await response.json();
  return (
    <Cases data = {data}/>
  )
}
