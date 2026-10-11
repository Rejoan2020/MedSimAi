import React from 'react'

const VERDICTS = {
    calibrated: { label: 'Well calibrated', className: 'bg-green-100 text-green-700' },
    overconfident: { label: 'Overconfident', className: 'bg-amber-100 text-amber-700' },
    underconfident: { label: 'Underconfident', className: 'bg-brand-primary text-light-blue' },
}

// How confident the student said they were before the case, next to how they scored
export default function ConfidenceCheck({ rows }) {
    const overconfident = rows.filter((r) => r.verdict === 'overconfident').map((r) => r.skill.toLowerCase())

    return (
        <section className='rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6'>
            <div className='eyebrow'>Self-assessment</div>
            <h2 className='mt-0.5 text-lg font-bold'>Confidence check</h2>
            <p className='mt-1 text-sm text-Secondary-Text'>
                {overconfident.length > 0
                    ? `You rated yourself higher than you scored in ${overconfident.join(' and ')}. These are worth extra practice.`
                    : 'How confident you felt before the case, compared with how you scored.'}
            </p>

            <ul className='mt-4 divide-y divide-brand-secondary'>
                {rows.map((row) => {
                    const verdict = VERDICTS[row.verdict]
                    return (
                        <li key={row.skill} className='flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between'>
                            <div className='font-medium'>{row.skill}</div>
                            <div className='flex flex-wrap items-center gap-3 text-sm'>
                                <span className='text-Secondary-Text'>Confidence <strong className='text-deep-blue'>{row.rating}/5</strong></span>
                                <span className='text-Secondary-Text'>Score <strong className='text-deep-blue'>{row.score}%</strong></span>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${verdict.className}`}>{verdict.label}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
