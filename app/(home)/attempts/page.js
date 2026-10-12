import React from 'react'
import { redirect } from 'next/navigation'
import { History } from 'lucide-react'
import AttemptList from '../components/AttemptList'
import CaseFilter from './components/CaseFilter'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'
import { getCurrentUser } from '@/lib/currentUser'
import { getStudentAttempts } from '@/lib/stats'

export const metadata = {
  title: 'My attempts · MedSimAI',
}

export default async function page({ searchParams }) {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const { case: caseSlug } = await searchParams;
  const allAttempts = await getStudentAttempts(user._id);

  const attemptedCases = [...new Map(allAttempts.map((a) => [a.slug, { slug: a.slug, title: a.title }])).values()]
    .sort((a, b) => a.title.localeCompare(b.title));
  const selected = attemptedCases.some((c) => c.slug === caseSlug) ? caseSlug : null;
  const attempts = selected ? allAttempts.filter((a) => a.slug === selected) : allAttempts;

  const completed = attempts.filter((a) => a.status === 'completed').length;

  return (
    <PageContainer>
      <PageHeader
        eyebrow='Your practice'
        title='My attempts'
        description={`${attempts.length} ${attempts.length === 1 ? 'attempt' : 'attempts'} · ${completed} completed`}
        icon={History}
        actions={attemptedCases.length > 0 && <CaseFilter cases={attemptedCases} selected={selected} />}
      />
      <AttemptList
        attempts={attempts}
        emptyText="You haven't attempted any cases yet. Pick one from the case library to get started."
      />
    </PageContainer>
  )
}
