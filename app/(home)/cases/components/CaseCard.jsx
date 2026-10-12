import { ArrowRight, Clock, PersonStanding } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Stars from './Stars'
import Link from 'next/link'

export default function CaseCard({ title, slug, image, tags, specialty, difficulty, duration, patient, description, completedBy, bestScore, priority = false }) {
    const patientType = patient?.age == null ? null : patient.age >= 18 ? 'Adult' : 'Pediatric'

    return (
        <article className='flex flex-col overflow-hidden rounded-2xl border border-brand-secondary bg-white transition hover:border-light-blue hover:shadow-[0_8px_30px_rgb(48_123_196_/_0.12)]'>
            <div className='flex flex-col gap-4 p-4 sm:flex-row sm:p-5'>
                <div className='relative h-44 shrink-0 overflow-hidden rounded-xl bg-brand-primary ring-1 ring-brand-secondary sm:h-32 sm:w-32'>
                    <Image
                        fill alt='' src={image || '/cases/person.png'} priority={priority}
                        sizes='(min-width: 640px) 128px, 100vw'
                        className='object-cover object-[center_25%]'
                    />
                </div>

                <div className='flex min-w-0 flex-col gap-2'>
                    <div className='eyebrow'>{specialty}</div>
                    <h2 className='text-lg font-bold'>{title}</h2>
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

            <div className='mt-auto grid grid-cols-3 gap-2 border-t border-brand-secondary bg-brand-primary/50 px-4 py-3 text-xs sm:px-5'>
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

            <div className='border-t border-brand-secondary p-4 sm:px-5'>
                <Link
                    className='flex w-full items-center justify-center gap-2 rounded-full bg-light-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark sm:ml-auto sm:w-auto'
                    href={`/cases/${slug}`}
                >
                    View case <ArrowRight className='h-4 w-4' />
                </Link>
            </div>
        </article>
    )
}
