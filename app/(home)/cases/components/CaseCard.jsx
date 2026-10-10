import { ArrowRight, Clock, PersonStanding } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Stars from './Stars'
import Link from 'next/link'

export default function CaseCard({ title, slug, image, tags, specialty, difficulty, duration, patient, description, completedBy, bestScore }) {
    const patientType = patient?.age == null ? null : patient.age >= 18 ? 'Adult' : 'Pediatric'

    return (
        <article className='flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-light-blue/40 hover:shadow-sm'>
            <div className='flex flex-col gap-4 p-4 sm:flex-row sm:p-5'>
                <div className='flex h-36 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-gray-100 sm:h-32 sm:w-32'>
                    <Image
                        height={112} width={112} alt='' src={image || '/cases/person.png'}
                        className='h-28 w-28 object-contain sm:h-24 sm:w-24'
                    />
                </div>

                <div className='flex min-w-0 flex-col gap-2'>
                    <div className='text-xs font-medium uppercase tracking-wide text-light-blue'>{specialty}</div>
                    <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
                    <p className='line-clamp-3 text-sm text-Secondary-Text'>{description}</p>
                    <div className='flex flex-wrap gap-2 pt-1 text-xs'>
                        <span className='rounded-full bg-brand-primary px-2.5 py-1 text-deep-blue'>{difficulty}</span>
                        {duration &&
                            <span className='inline-flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 text-deep-blue'>
                                <Clock className='h-3.5 w-3.5' /> {duration}
                            </span>}
                        {patientType &&
                            <span className='inline-flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 text-deep-blue'>
                                <PersonStanding className='h-3.5 w-3.5' /> {patientType}
                            </span>}
                    </div>
                    {tags.length > 0 &&
                        <div className='flex flex-wrap gap-x-3 gap-y-1 text-xs text-Secondary-Text'>
                            {tags.map((t) => <span key={t}>#{t}</span>)}
                        </div>}
                </div>
            </div>

            <div className='mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 bg-gray-50/60 px-4 py-3 text-xs sm:px-5'>
                <div>
                    <div className='text-Secondary-Text'>Difficulty</div>
                    <Stars difficulty={difficulty} />
                </div>
                <div>
                    <div className='text-Secondary-Text'>Completed by</div>
                    <div className='text-sm font-medium'>{completedBy} {completedBy === 1 ? 'learner' : 'learners'}</div>
                </div>
                <div>
                    <div className='text-Secondary-Text'>Your best</div>
                    <div className={`text-sm font-semibold ${bestScore === null ? 'text-Secondary-Text' : 'text-green-600'}`}>
                        {bestScore === null ? 'Not yet' : `${bestScore}%`}
                    </div>
                </div>
            </div>

            <div className='border-t border-gray-100 p-4 sm:px-5'>
                <Link
                    className='flex w-full items-center justify-center gap-2 rounded-lg bg-deep-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-deep-blue/90 sm:ml-auto sm:w-auto'
                    href={`/cases/${slug}`}
                >
                    View case <ArrowRight className='h-4 w-4' />
                </Link>
            </div>
        </article>
    )
}
