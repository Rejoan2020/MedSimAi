import React from 'react'
import Welcome from './Welcome'
import Section from './Section'
import CaseCard from './CaseCard'
import ContinueSessions from './ContinueSessions'
import RecentResults from './RecentResults';
import { PageContainer } from '@/app/components/PageHeader';

export default function Dashboard({ name, data }) {
    const stats = [
        { value: data.casesAttempted, label: 'Cases attempted' },
        { value: data.averageScore === null ? '–' : `${data.averageScore}%`, label: 'Average score' },
        { value: data.totalSessions, label: 'Total sessions' },
    ]
    const hasInProgress = data.inProgress.length > 0

    const recommended = (
        <Section eyebrow='Up next' title='Recommended cases'>
            {data.recommendedCases.length === 0
                ? <div className='text-Secondary-Text'>You&apos;ve tried every case. Nice work!</div>
                : data.recommendedCases.map((cs) =>
                    <CaseCard key={cs._id} href={`/cases/${cs.slug}`} title={cs.title} type={cs.specialty} level={cs.difficulty} />)}
        </Section>
    )

    return (
        <PageContainer>
            <Welcome name={name} stats={stats} nextCase={data.recommendedCases[0] ?? null} />

            {/* With unfinished sessions: what's next and what to resume side by side, results below.
                Without: what's next beside recent results. */}
            {hasInProgress
                ? <>
                    <div className='grid items-start gap-6 xl:grid-cols-2'>
                        {recommended}
                        <ContinueSessions sessions={data.inProgress} total={data.inProgressTotal} />
                    </div>
                    <RecentResults results={data.recentResults} />
                </>
                : <div className='grid items-start gap-6 xl:grid-cols-2'>
                    {recommended}
                    <RecentResults results={data.recentResults} />
                </div>}
        </PageContainer>
    )
}
