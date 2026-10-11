import React from 'react'
import Link from 'next/link';
import Welcome from './Welcome'
import Section from './Section'
import { ArrowRight } from 'lucide-react';
import CaseCard from './CaseCard'
import RecentResults from './RecentResults';
import { PageContainer } from '@/app/components/PageHeader';

export default function Dashboard({ name, data }) {
    const stats = [
        { value: data.casesAttempted, label: 'Cases attempted' },
        { value: data.averageScore === null ? '–' : `${data.averageScore}%`, label: 'Average score' },
        { value: data.totalSessions, label: 'Total sessions' },
    ]

    return (
        <PageContainer>
            <Welcome name={name} stats={stats} nextCase={data.recommendedCases[0] ?? null} />

            <div className='grid gap-6 xl:grid-cols-2'>
                <Section eyebrow='Up next' title='Recommended cases'>
                    {data.recommendedCases.length === 0
                        ? <div className='text-Secondary-Text'>You&apos;ve tried every case. Nice work!</div>
                        : data.recommendedCases.map((cs) =>
                            <CaseCard key={cs._id} href={`/cases/${cs.slug}`} title={cs.title} type={cs.specialty} level={cs.difficulty} />)}
                </Section>

                <Section
                    eyebrow='Your practice'
                    title='Attempted cases'
                    action={<Link href='/cases' className='flex items-center gap-1 text-sm font-medium text-light-blue hover:text-primary-dark'>View all <ArrowRight className='h-4 w-4' /></Link>}
                >
                    {data.attemptedCases.length === 0
                        ? <div className='text-Secondary-Text'>You haven&apos;t attempted any cases yet.</div>
                        : data.attemptedCases.map((cs) =>
                            <CaseCard
                                key={cs._id}
                                href={`/cases/${cs.slug}`}
                                title={cs.title}
                                type={cs.specialty}
                                level={cs.difficulty}
                                result={cs.bestScore === null ? undefined : `${cs.bestScore}%`}
                            />)}
                </Section>
            </div>

            <RecentResults results={data.recentResults} />
        </PageContainer>
    )
}
