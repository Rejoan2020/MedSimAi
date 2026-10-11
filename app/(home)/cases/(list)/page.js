import React from 'react'
import { redirect } from 'next/navigation';
import Cases from '../components/Cases'
import { getPublicCases } from '@/lib/cases';
import { getCurrentUser } from '@/lib/currentUser';
import { getCaseStats } from '@/lib/stats';

export default async function page() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const [cases, stats] = await Promise.all([getPublicCases(), getCaseStats(user._id)]);
  return (
    <Cases data={{ data: cases }} stats={stats} />
  )
}
