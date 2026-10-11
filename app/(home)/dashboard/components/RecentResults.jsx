import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CaseCard from './CaseCard'
import Section from './Section'

export default function RecentResults({ results }) {
    return (
        <Section
            eyebrow='Feedback'
            title='Recent results'
            action={<Link href='/attempts' className='flex items-center gap-1 text-sm font-medium text-light-blue hover:text-primary-dark'>View all <ArrowRight className='h-4 w-4' /></Link>}
        >
            {results.length === 0
                ? <div className='text-Secondary-Text'>Complete a case to see your results here.</div>
                : results.map((result) =>
                    <CaseCard
                        key={result.attemptId}
                        href={`/cases/${result.slug}/feedback/${result.attemptId}`}
                        title={result.title}
                        type={result.specialty}
                        level={result.difficulty}
                        result={`${result.score}%`}
                    />)}
        </Section>
    )
}
