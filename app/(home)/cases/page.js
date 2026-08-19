import React from 'react'
import Cases from './components/Cases'

export default async function page() {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/cases`);
  const data = await response.json();
  return (
    <Cases data = {data}/>
  )
}
