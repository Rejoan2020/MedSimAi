import React from 'react'
import { connection } from 'next/server'
import Signin from '../components/Signin'
import { demoEnabled } from '@/lib/demo'

export default async function page() {
  await connection();

  return (
    <Signin demo={demoEnabled()} />
  )
}
