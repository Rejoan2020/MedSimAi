'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { deleteCase, setCasePublished } from '@/app/actions/adminCases'

export default function CaseTable({ cases }) {
    const router = useRouter()
    const [busyId, setBusyId] = useState(null)
    const [error, setError] = useState('')

    async function run(id, action) {
        setBusyId(id)
        setError('')
        try {
            const result = await action()
            if (!result.success) throw new Error(result.message)
            router.refresh()
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setBusyId(null)
        }
    }

    function handleDelete(c) {
        if (!confirm(`Delete "${c.title}"? This can't be undone.`)) return
        run(c._id, () => deleteCase(c._id))
    }

    if (cases.length === 0) {
        return <div className='p-6 text-Secondary-Text'>No cases yet. Create one to get started.</div>
    }

    const actions = (c) => (
        <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm'>
            <Link href={`/admin-dashboard/cases/${c._id}/edit`} className='text-light-blue hover:underline'>Edit</Link>
            <Link href={`/cases/${c.slug}`} className='text-light-blue hover:underline'>Preview</Link>
            <button
                onClick={() => run(c._id, () => setCasePublished(c._id, !c.isPublished))}
                disabled={busyId === c._id}
                className='text-light-blue hover:underline cursor-pointer disabled:opacity-50'
            >
                {c.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            <button
                onClick={() => handleDelete(c)}
                disabled={busyId === c._id}
                className='text-red-600 hover:underline cursor-pointer disabled:opacity-50'
            >
                Delete
            </button>
        </div>
    )

    const status = (c) => (
        <span className={`shrink-0 rounded-full px-2 py-1 text-xs ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {c.isPublished ? 'Published' : 'Draft'}
        </span>
    )

    const average = (c) => c.averageScore === null ? '–' : `${c.averageScore}%`

    return (
        <div className='flex flex-col'>
            {error && <p className='px-4 pt-4 text-sm text-red-600 sm:px-6'>{error}</p>}

            {/* Cards on small screens */}
            <ul className='divide-y divide-gray-100 md:hidden'>
                {cases.map((c) =>
                    <li key={c._id} className='flex flex-col gap-2 p-4'>
                        <div className='flex items-start justify-between gap-3'>
                            <div className='min-w-0'>
                                <div className='font-medium'>{c.title}</div>
                                <div className='text-sm text-Secondary-Text'>{[c.specialty, c.difficulty].filter(Boolean).join(' · ')}</div>
                            </div>
                            {status(c)}
                        </div>
                        <div className='text-sm text-Secondary-Text'>{c.attempts} {c.attempts === 1 ? "attempt" : "attempts"} · Avg {average(c)}</div>
                        {actions(c)}
                    </li>)}
            </ul>

            {/* Table from md up */}
            <table className='hidden w-full text-left text-sm md:table'>
                <thead className='border-b border-gray-100 text-Secondary-Text'>
                    <tr>
                        <th className='px-6 py-3 font-normal'>Title</th>
                        <th className='px-3 py-3 font-normal'>Specialty</th>
                        <th className='px-3 py-3 font-normal'>Difficulty</th>
                        <th className='px-3 py-3 font-normal'>Status</th>
                        <th className='px-3 py-3 font-normal'>Attempts</th>
                        <th className='px-3 py-3 font-normal'>Avg score</th>
                        <th className='px-6 py-3 font-normal'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((c) =>
                        <tr key={c._id} className='border-b border-gray-100 last:border-0'>
                            <td className='px-6 py-3 font-medium'>{c.title}</td>
                            <td className='px-3 py-3'>{c.specialty || '–'}</td>
                            <td className='px-3 py-3'>{c.difficulty || '–'}</td>
                            <td className='px-3 py-3'>{status(c)}</td>
                            <td className='px-3 py-3'>{c.attempts}</td>
                            <td className='px-3 py-3'>{average(c)}</td>
                            <td className='px-6 py-3'>{actions(c)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
