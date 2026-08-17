import { Sheet } from 'lucide-react'
import React from 'react'
import CaseCard from './CaseCard'

export default function RecentResults() {
    const results = [
        {
            'title': 'Infant with Fever and Irritability',
            'type': 'Pediatrics',
            'level': 'Beginner',
            'score': '59%',
        },
        {
            'title': 'Newly Diagnosed Hypertension in Primary Care',
            'type': 'Family Medicine',
            'level': 'Intermediate',
            'score': '67%'
        },
        {
            'title': 'Hypothyroidism',
            'type': 'Family Medicine',
            'level': 'Intermediate',
            'score': '89%'
        }
    ]
    return (
        <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
            <div className='flex gap-1 items-center font-bold text-[24px]'>
                <Sheet />
                <div>Recent Results</div>
            </div>
            {results.map((result, index) => <CaseCard key={index} title={result.title} type={result.type} level={result.level} result={result.score}/>)}
        </div>
    )
}
