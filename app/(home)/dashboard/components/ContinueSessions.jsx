import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CaseCard from './CaseCard'
import Section from './Section'

// "3 hours ago", "2 days ago"
function timeAgo(value) {
    const seconds = Math.round((new Date(value) - Date.now()) / 1000)
    const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]]
    const format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    for (const [unit, size] of units) {
        if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit)
    }
    return 'just now'
}

// Unfinished sessions the student can resume
export default function ContinueSessions({ sessions, total }) {
    return (
        <Section
            eyebrow='In progress'
            title='Continue where you left off'
            action={total > sessions.length &&
                <Link href='/attempts' className='flex items-center gap-1 text-sm font-medium text-light-blue hover:text-primary-dark'>View all <ArrowRight className='h-4 w-4' /></Link>}
        >
            {sessions.map((s) =>
                <CaseCard
                    key={s.attemptId}
                    href={`/cases/${s.slug}/active-session?attempt=${s.attemptId}`}
                    title={s.title}
                    type={s.specialty}
                    meta={`Attempt ${s.attemptNumber} · ${timeAgo(s.startedAt)}`}
                    result='Resume'
                />)}
        </Section>
    )
}
