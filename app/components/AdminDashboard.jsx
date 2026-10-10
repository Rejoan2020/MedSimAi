import React from 'react'
import Card from '../admin-dashboard/components/Card'
import Link from 'next/link'

export default function Dashboard({ overview }) {
    const cards = [
        {
            'title': 'Total enrolled students',
            'number': overview.totalStudents,
            'icon': '/icons/students.svg',
        },
        {
            'title': 'Students who completed a case',
            'number': overview.studentsCompleted,
            'icon': '/icons/completed.svg',
        },
        {
            'title': 'Average Score',
            'number': overview.averageScore === null ? '–' : `${overview.averageScore}%`,
            'icon': '/icons/medal.svg',
        },
        {
            'title': `Students at Risk (avg < ${overview.atRiskThreshold}%)`,
            'number': overview.studentsAtRisk,
            'icon': '/icons/risk.svg',
        },
    ]

    return (
        <div className='p-10 w-full'>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-wrap items-center justify-between gap-4'>
                    <div>
                        <div className='text-[28px] font-medium'>Case Library</div>
                        <div className='text-[#717680]'>
                            {overview.cases.length} {overview.cases.length === 1 ? 'case' : 'cases'}
                        </div>
                    </div>
                    <Link href={'/admin-dashboard/create-new-case'} className='border p-2 bg-green-500 text-white rounded-lg'>
                        Create a new case
                    </Link>
                </div>
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2'>
                    {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
                </div>

                <div className='border-1 border-[#F0F4FE] rounded-xl p-4 overflow-x-auto'>
                    <div className='text-[#2536A8] font-medium text-[20px] py-4'>Cases</div>
                    {overview.cases.length === 0
                        ? <div className='text-Secondary-Text'>No cases yet. Create one to get started.</div>
                        : <table className='w-full text-left text-sm'>
                            <thead className='text-[#717680] border-b border-[#F0F4FE]'>
                                <tr>
                                    <th className='py-2 pr-4 font-normal'>Title</th>
                                    <th className='py-2 pr-4 font-normal'>Specialty</th>
                                    <th className='py-2 pr-4 font-normal'>Difficulty</th>
                                    <th className='py-2 pr-4 font-normal'>Duration</th>
                                    <th className='py-2 pr-4 font-normal'>Status</th>
                                    <th className='py-2 pr-4 font-normal'>Attempts</th>
                                    <th className='py-2 pr-4 font-normal'>Completed</th>
                                    <th className='py-2 font-normal'>Avg score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overview.cases.map((c) =>
                                    <tr key={c._id} className='border-b border-[#F0F4FE]'>
                                        <td className='py-2 pr-4'>
                                            <Link href={`/admin-dashboard/cases/${c._id}/edit`} className='text-light-blue hover:underline'>{c.title}</Link>
                                        </td>
                                        <td className='py-2 pr-4'>{c.specialty || '–'}</td>
                                        <td className='py-2 pr-4'>{c.difficulty || '–'}</td>
                                        <td className='py-2 pr-4'>{c.duration || '–'}</td>
                                        <td className='py-2 pr-4'>{c.isPublished ? 'Published' : 'Draft'}</td>
                                        <td className='py-2 pr-4'>{c.attempts}</td>
                                        <td className='py-2 pr-4'>{c.completions}</td>
                                        <td className='py-2'>{c.averageScore === null ? '–' : `${c.averageScore}%`}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    )
}
