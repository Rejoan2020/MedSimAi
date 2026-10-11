import React from 'react'
import { connection } from 'next/server'
import Signin from '../components/Signin'
import { demoEnabled } from '@/lib/demo'

export default async function page() {
  // Read DEMO_PASSWORD per request, so the demo buttons follow the host's env without a rebuild
  await connection();

  return (
    <Signin demo={demoEnabled()} />
  )
}
