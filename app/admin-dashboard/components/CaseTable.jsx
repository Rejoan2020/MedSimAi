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
        return <div className='text-Secondary-Text'>No cases yet. Create one to get started.</div>
    }

    return (
        <div className='flex flex-col gap-2'>
            {error && <p className='text-sm text-red-600'>{error}</p>}
            <table className='w-full text-left text-sm'>
                <thead className='text-[#717680] border-b border-[#F0F4FE]'>
                    <tr>
                        <th className='py-2 pr-4 font-normal'>Title</th>
                        <th className='py-2 pr-4 font-normal'>Specialty</th>
                        <th className='py-2 pr-4 font-normal'>Difficulty</th>
                        <th className='py-2 pr-4 font-normal'>Status</th>
                        <th className='py-2 pr-4 font-normal'>Attempts</th>
                        <th className='py-2 pr-4 font-normal'>Avg score</th>
                        <th className='py-2 font-normal'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((c) =>
                        <tr key={c._id} className='border-b border-[#F0F4FE]'>
                            <td className='py-2 pr-4 font-medium'>{c.title}</td>
                            <td className='py-2 pr-4'>{c.specialty || '–'}</td>
                            <td className='py-2 pr-4'>{c.difficulty || '–'}</td>
                            <td className='py-2 pr-4'>
                                <span className={`rounded-full px-2 py-1 text-xs ${c.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {c.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td className='py-2 pr-4'>{c.attempts}</td>
                            <td className='py-2 pr-4'>{c.averageScore === null ? '–' : `${c.averageScore}%`}</td>
                            <td className='py-2'>
                                <div className='flex flex-wrap gap-3'>
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
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
