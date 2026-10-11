import React from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import SpecialtyIcon from '@/app/components/SpecialtyIcon'

function formatDate(value) {
    if (!value) return ''
    return new Date(value).toLocaleString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
}

function StatusBadge({ status }) {
    const styles = {
        completed: 'bg-green-100 text-green-700',
        started: 'bg-amber-100 text-amber-700',
        abandoned: 'bg-gray-100 text-gray-600',
    }
    const labels = { completed: 'Completed', started: 'In progress', abandoned: 'Abandoned' }
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? styles.abandoned}`}>
            {labels[status] ?? status}
        </span>
    )
}

// The action for an attempt: feedback once completed, or resume while in progress
function AttemptAction({ attempt }) {
    if (attempt.status === 'completed') {
        return (
            <Link
                href={`/cases/${attempt.slug}/feedback/${attempt.attemptId}`}
                className='inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-secondary px-4 py-2 text-sm font-medium text-light-blue hover:border-light-blue hover:bg-brand-primary'
            >
                View feedback <ArrowRight className='h-4 w-4' />
            </Link>
        )
    }
    if (attempt.status === 'started') {
        return (
            <Link
                href={`/cases/${attempt.slug}/active-session?attempt=${attempt.attemptId}`}
                className='inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-light-blue px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark'
            >
                <Play className='h-4 w-4' /> Resume
            </Link>
        )
    }
    return null
}

// A student's attempts, newest first. showCase adds the case name for mixed lists.
export default function AttemptList({ attempts, showCase = true, emptyText = "You haven't attempted any cases yet." }) {
    if (attempts.length === 0) {
        return <div className='rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-Secondary-Text'>{emptyText}</div>
    }

    return (
        <ul className='divide-y divide-brand-secondary overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
            {attempts.map((attempt) =>
                <li key={attempt.attemptId} className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6'>
                    <div className='flex min-w-0 flex-1 items-center gap-4'>
                        {showCase &&
                            <SpecialtyIcon specialty={attempt.specialty} className='h-11 w-11 shrink-0 rounded-xl bg-brand-primary p-2.5 text-light-blue' />}
                        <div className='min-w-0'>
                            <div className='truncate font-semibold'>
                                {showCase ? attempt.title : `Attempt ${attempt.attemptNumber}`}
                            </div>
                            <div className='text-sm text-Secondary-Text'>
                                {showCase && <>Attempt {attempt.attemptNumber} · </>}
                                {formatDate(attempt.completedAt ?? attempt.startedAt)}
                                {' · '}{attempt.questionsAsked} {attempt.questionsAsked === 1 ? 'question' : 'questions'}
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-4 sm:justify-end'>
                        <div className='flex items-center gap-3'>
                            <StatusBadge status={attempt.status} />
                            {attempt.score !== null &&
                                <span className='rounded-full bg-brand-primary px-3 py-1 text-sm font-semibold text-light-blue'>{attempt.score}%</span>}
                        </div>
                        <AttemptAction attempt={attempt} />
                    </div>
                </li>)}
        </ul>
    )
}
