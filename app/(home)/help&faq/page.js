import React from 'react'
import Help from './components/Help'
import { getFaqs } from '@/lib/content'

export default async function page() {
  const questions = await getFaqs();
  return (
    <Help questions={questions} />
  )
}
