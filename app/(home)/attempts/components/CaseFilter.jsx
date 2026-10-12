'use client'

import { useRouter } from 'next/navigation'

export default function CaseFilter({ cases, selected }) {
    const router = useRouter()

    return (
        <label className='flex items-center gap-2 text-sm text-Secondary-Text'>
            Case
            <select
                value={selected ?? ''}
                onChange={(e) => router.push(e.target.value ? `/attempts?case=${encodeURIComponent(e.target.value)}` : '/attempts')}
                className='rounded-full border border-brand-secondary bg-white px-4 py-2 text-sm text-deep-blue outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20'
            >
                <option value=''>All cases</option>
                {cases.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
        </label>
    )
}
