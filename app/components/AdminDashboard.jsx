import React from 'react'
import Link from 'next/link'
import { ChevronRight, Plus } from 'lucide-react'
import { GlassStats, HeroBanner, PageContainer } from './PageHeader'
import SpecialtyIcon from './SpecialtyIcon'

export default function Dashboard({ overview }) {
    const stats = [
        { value: overview.totalStudents, label: 'Enrolled students' },
        { value: overview.studentsCompleted, label: 'Completed a case' },
        { value: overview.averageScore === null ? '–' : `${overview.averageScore}%`, label: 'Average score' },
        { value: overview.studentsAtRisk, label: `At risk (avg < ${overview.atRiskThreshold}%)` },
    ]

    return (
        <PageContainer>
            <HeroBanner>
                <div className='flex flex-col gap-8 p-6 sm:p-10'>
                    <div className='flex flex-wrap items-end justify-between gap-6'>
                        <div className='max-w-xl'>
                            <div className='text-sm font-medium text-white/80'>Admin overview</div>
                            <h1 className='mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl'>Your case library</h1>
                            <p className='mt-3 text-white/85'>
                                {overview.cases.length} {overview.cases.length === 1 ? 'case' : 'cases'}, with live progress from your students.
                            </p>
                        </div>
                        <Link href={'/admin-dashboard/create-new-case'} className='inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-light-blue shadow-sm hover:bg-brand-primary'>
                            <Plus className='h-4 w-4' /> New case
                        </Link>
                    </div>
                    <GlassStats stats={stats} />
                </div>
            </HeroBanner>

            <section className='rounded-2xl border border-brand-secondary bg-white'>
                <div className='flex items-end justify-between border-b border-brand-secondary px-5 py-4 sm:px-6'>
                    <div>
                        <div className='eyebrow'>Cases</div>
                        <h2 className='mt-0.5 text-xl font-bold'>Student progress by case</h2>
                    </div>
                    <Link href='/admin-dashboard/cases' className='text-sm font-medium text-light-blue hover:text-primary-dark'>Manage cases</Link>
                </div>
                {overview.cases.length === 0
                    ? <div className='p-6 text-Secondary-Text'>No cases yet. Create one to get started.</div>
                    : <ul className='divide-y divide-brand-secondary'>
                        {overview.cases.map((c) =>
                            <li key={c._id}>
                                <Link href={`/admin-dashboard/cases/${c._id}/edit`} className='group flex items-center gap-4 px-5 py-4 hover:bg-brand-primary/60 sm:px-6'>
                                    <SpecialtyIcon specialty={c.specialty} className='h-11 w-11 shrink-0 rounded-xl bg-brand-primary p-2.5 text-light-blue' />
                                    <div className='flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
                                        <div className='min-w-0'>
                                            <div className='font-semibold'>{c.title}</div>
                                            <div className='text-sm text-Secondary-Text'>
                                                {[c.specialty, c.difficulty, c.duration].filter(Boolean).join(' · ')}
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-Secondary-Text'>
                                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {c.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                            <span>{c.attempts} {c.attempts === 1 ? 'attempt' : 'attempts'}</span>
                                            <span>{c.completions} completed</span>
                                            <span>Avg {c.averageScore === null ? '–' : `${c.averageScore}%`}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className='h-5 w-5 shrink-0 text-gray-400 group-hover:text-light-blue' />
                                </Link>
                            </li>)}
                    </ul>}
            </section>
        </PageContainer>
    )
}
