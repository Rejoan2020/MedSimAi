import React from 'react'

export function PageContainer({ children, className = '' }) {
    return (
        <div className={`mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10 ${className}`}>
            {children}
        </div>
    )
}

export default function PageHeader({ eyebrow, title, description, icon: Icon, actions }) {
    return (
        <div className='flex flex-wrap items-end justify-between gap-4'>
            <div className='flex min-w-0 items-start gap-4'>
                {Icon &&
                    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-secondary bg-white'>
                        <Icon className='h-6 w-6 text-light-blue' strokeWidth={1.75} />
                    </div>}
                <div className='min-w-0'>
                    {eyebrow && <div className='eyebrow'>{eyebrow}</div>}
                    <h1 className='mt-0.5 text-2xl font-bold sm:text-3xl'>{title}</h1>
                    {description && <p className='mt-1 text-sm text-Secondary-Text sm:text-base'>{description}</p>}
                </div>
            </div>
            {actions && <div className='flex flex-wrap items-center gap-2'>{actions}</div>}
        </div>
    )
}

export function HeroBanner({ children, className = '' }) {
    return (
        <div className={`hero-gradient relative overflow-hidden rounded-3xl text-white ${className}`}>
            <div aria-hidden className='pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-light-blue/25 blur-3xl' />
            <div aria-hidden className='pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#0F2640]/40 blur-3xl' />
            <div className='relative'>{children}</div>
        </div>
    )
}

export function GlassStats({ stats }) {
    const layout = stats.length === 4
        ? 'grid-cols-2 sm:grid-cols-4 [&>*:nth-child(-n+2)]:border-b sm:[&>*:nth-child(-n+2)]:border-b-0 [&>*:nth-child(even)]:border-l sm:[&>*:not(:first-child)]:border-l'
        : 'grid-cols-3 [&>*:not(:first-child)]:border-l'
    return (
        <div className={`glass grid rounded-2xl [&>*]:border-white/25 ${layout}`}>
            {stats.map((stat) =>
                <div key={stat.label} className='px-3 py-4 text-center sm:px-6 sm:py-5'>
                    <div className='text-2xl font-semibold text-white sm:text-4xl'>{stat.value}</div>
                    <div className='mt-1 text-[11px] leading-tight text-white/80 sm:text-sm'>{stat.label}</div>
                </div>)}
        </div>
    )
}
