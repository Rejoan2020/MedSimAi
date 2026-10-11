'use client'

import { ChevronDown } from 'lucide-react'
import PerformanceIndicator from '@/components/PerformanceIndicator'
import Details from './Details'
import { IconTile, ScoreRing, scoreBand } from './ui'

// One feedback category (consultation, clinical reasoning or communication); starts collapsed
export default function CategoryCard({ id, title, subtitle, icon, category, open, onToggle }) {
    const band = scoreBand(category.score)

    return (
        <section id={id} aria-labelledby={`${id}-title`} className='scroll-mt-6 overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
            <h2 id={`${id}-title`}>
                <button
                    type='button'
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={`${id}-body`}
                    className='flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-brand-primary/40 cursor-pointer sm:px-6'
                >
                    <IconTile icon={icon} />
                    <span className='min-w-0 flex-1'>
                        <span className='block text-lg font-bold leading-tight'>{title}</span>
                        <span className='block text-sm font-normal text-Secondary-Text'>{subtitle}</span>
                    </span>
                    <span className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:inline ${band.pill}`}>{band.label}</span>
                    <span className='shrink-0 text-xl font-bold' style={{ color: band.color }}>{category.score}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-Secondary-Text transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                </button>
            </h2>

            {open &&
                <div id={`${id}-body`} className='border-t border-brand-secondary'>
                    <div className='flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-start lg:gap-8'>
                        <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left lg:w-2/5 lg:flex-col lg:items-start'>
                            <ScoreRing score={category.score} />
                            <div className='min-w-0'>
                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold sm:hidden ${band.pill}`}>{band.label}</span>
                                <p className='mt-2 leading-relaxed text-gray-700 sm:mt-0'>{category.description}</p>
                            </div>
                        </div>

                        {category.performance.length > 0 &&
                            <div className='flex-1'>
                                <h3 className='pb-3 text-sm font-semibold'>Performance by section</h3>
                                <ul className='flex flex-col gap-3'>
                                    {category.performance.map((item, idx) =>
                                        <li key={idx} className='rounded-xl bg-gray-50 p-3'>
                                            <div className='flex justify-between gap-2 pb-2 text-sm'>
                                                <span className='font-medium'>{item.section}</span>
                                                <span className='shrink-0 font-semibold' style={{ color: scoreBand(item.score * 10).color }}>
                                                    {item.score}<span className='font-normal text-Secondary-Text'>/{item.maxScore}</span>
                                                </span>
                                            </div>
                                            <PerformanceIndicator score={item.score} color={scoreBand(item.score * 10).color} />
                                            {item.details && <p className='pt-2 text-sm text-Secondary-Text'>{item.details}</p>}
                                        </li>)}
                                </ul>
                            </div>}
                    </div>

                    {category.strengths.length + category.improvements.length + category.recommendations.length > 0 &&
                        <div className='border-t border-brand-secondary p-4 sm:p-6'>
                            <Details
                                strengths={category.strengths}
                                improvements={category.improvements}
                                recommendations={category.recommendations}
                            />
                        </div>}
                </div>}
        </section>
    )
}
