import React from 'react'
import Card from '../admin-dashboard/components/Card'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import PageHeader, { PageContainer } from './PageHeader'

export default function Dashboard({ overview }) {
    const cards = [
        {
            'title': 'Enrolled students',
            'number': overview.totalStudents,
            'icon': '/icons/students.svg',
        },
        {
            'title': 'Completed a case',
            'number': overview.studentsCompleted,
            'icon': '/icons/completed.svg',
        },
        {
            'title': 'Average score',
            'number': overview.averageScore === null ? '–' : `${overview.averageScore}%`,
            'icon': '/icons/medal.svg',
        },
        {
            'title': `At risk (avg < ${overview.atRiskThreshold}%)`,
            'number': overview.studentsAtRisk,
            'icon': '/icons/risk.svg',
        },
    ]

    return (
        <PageContainer>
            <PageHeader
                title='Overview'
                description={`${overview.cases.length} ${overview.cases.length === 1 ? 'case' : 'cases'} in the library`}
                actions={
                    <Link href={'/admin-dashboard/create-new-case'} className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-500'>
                        <Plus className='h-4 w-4' /> New case
                    </Link>
                }
            />
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
            </div>

            <section className='rounded-xl border border-gray-200 bg-white'>
                <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6'>
                    <h2 className='font-semibold text-[#2536A8]'>Cases</h2>
                    <Link href='/admin-dashboard/cases' className='text-sm text-light-blue hover:underline'>Manage cases</Link>
                </div>
                {overview.cases.length === 0
                    ? <div className='p-6 text-Secondary-Text'>No cases yet. Create one to get started.</div>
                    : <ul className='divide-y divide-gray-100'>
                        {overview.cases.map((c) =>
                            <li key={c._id}>
                                <Link href={`/admin-dashboard/cases/${c._id}/edit`} className='flex flex-col gap-2 px-4 py-3 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
                                    <div className='min-w-0'>
                                        <div className='font-medium text-gray-900'>{c.title}</div>
                                        <div className='text-sm text-Secondary-Text'>
                                            {[c.specialty, c.difficulty, c.duration].filter(Boolean).join(' · ')}
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-Secondary-Text'>
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {c.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                        <span>{c.attempts} {c.attempts === 1 ? "attempt" : "attempts"}</span>
                                        <span>{c.completions} completed</span>
                                        <span>Avg {c.averageScore === null ? '–' : `${c.averageScore}%`}</span>
                                    </div>
                                </Link>
                            </li>)}
                    </ul>}
            </section>
        </PageContainer>
    )
}
