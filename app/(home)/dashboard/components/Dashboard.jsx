import React from 'react'
import Link from 'next/link';
import Welcome from './Welcome'
import Card from './Card'
import { BookCheck, TargetIcon, LucideBookMarked, Laptop, ArrowRight } from 'lucide-react';
import CaseCard from './CaseCard'
import RecentResults from './RecentResults';

export default function Dashboard({ name, data }) {
    const cards = [
        {
            'title': 'Cases Attempted',
            'number': data.casesAttempted,
            'icon': BookCheck,
        },
        {
            'title': 'Average Score',
            'number': data.averageScore === null ? '–' : `${data.averageScore}%`,
            'icon': TargetIcon,
        },
        {
            'title': 'Total Sessions',
            'number': data.totalSessions,
            'icon': Laptop,
        }
    ]

    return (
        <div className='w-full m-8 flex flex-col items-center gap-8'>
            <Welcome name={name} />
            <div className='grid grid-cols md:grid-cols-2 xl:grid-cols-3 justify-between w-full max-w-350 '>
                {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
            </div>
            <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
                <div className='flex gap-2 pb-4'>
                    <div>
                        <TargetIcon size={24} className='mt-2' />
                    </div>
                    <div className='font-bold text-[24px]'>Recommended next cases</div>
                </div>

                {data.recommendedCases.length === 0
                    ? <div className='text-Secondary-Text'>You&apos;ve tried every case. Nice work!</div>
                    : data.recommendedCases.map((cs) =>
                        <CaseCard key={cs._id} href={`/cases/${cs.slug}`} title={cs.title} type={cs.specialty} level={cs.difficulty} />)}
            </div>
            <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
                <div className='flex gap-2 items-center pb-4 justify-between'>
                    <div className='flex gap-2'>
                        <div>
                            <LucideBookMarked size={24} className='mt-2'/>
                        </div>
                        <div className='font-bold text-[24px]'>Already attempted cases</div>
                    </div>
                    <Link href='/cases' className='flex gap-1 text-deep-blue hover:text-light-blue'><div> View All </div> <ArrowRight /></Link>
                </div>

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
            </div>
            <RecentResults results={data.recentResults} />
        </div>
    )
}
