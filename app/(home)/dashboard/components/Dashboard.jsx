import React from 'react'
import Link from 'next/link';
import Welcome from './Welcome'
import Card from './Card'
import Section from './Section'
import { BookCheck, TargetIcon, LucideBookMarked, Laptop, ArrowRight } from 'lucide-react';
import CaseCard from './CaseCard'
import RecentResults from './RecentResults';
import { PageContainer } from '@/app/components/PageHeader';

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
        <PageContainer>
            <Welcome name={name} />
            <div className='grid gap-4 sm:grid-cols-3'>
                {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
            </div>

            <div className='grid gap-6 xl:grid-cols-2'>
                <Section title='Recommended next cases' icon={TargetIcon}>
                    {data.recommendedCases.length === 0
                        ? <div className='text-Secondary-Text'>You&apos;ve tried every case. Nice work!</div>
                        : data.recommendedCases.map((cs) =>
                            <CaseCard key={cs._id} href={`/cases/${cs.slug}`} title={cs.title} type={cs.specialty} level={cs.difficulty} />)}
                </Section>

                <Section
                    title='Already attempted cases'
                    icon={LucideBookMarked}
                    action={<Link href='/cases' className='flex items-center gap-1 text-sm text-deep-blue hover:text-light-blue'>View all <ArrowRight className='h-4 w-4' /></Link>}
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
