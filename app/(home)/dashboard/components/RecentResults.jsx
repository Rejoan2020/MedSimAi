import { Sheet } from 'lucide-react'
import React from 'react'
import CaseCard from './CaseCard'
import Section from './Section'

export default function RecentResults({ results }) {
    return (
        <Section title='Recent results' icon={Sheet}>
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
