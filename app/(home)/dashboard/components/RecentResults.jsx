import { Sheet } from 'lucide-react'
import React from 'react'
import CaseCard from './CaseCard'

export default function RecentResults({ results }) {
    return (
        <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
            <div className='flex gap-1 items-center font-bold text-[24px]'>
                <Sheet size={24}/>
                <div>Recent Results</div>
            </div>
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
        </div>
    )
}
