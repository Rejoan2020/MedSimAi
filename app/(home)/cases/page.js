import React from 'react'
import Cases from './components/Cases'
import { getPublicCases } from '@/lib/cases';

export default async function page() {
  const cases = await getPublicCases();
  return (
    <Cases data={{ data: cases }} />
  )
}
