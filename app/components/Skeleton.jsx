import React from 'react'

// Building blocks for loading screens that mirror each page's layout, so content
// appears in place instead of after a blank spinner.

// A single placeholder shape
export function Bone({ className = '' }) {
    // A background passed in className replaces the default tint
    const background = /(^|\s)bg-/.test(className) ? '' : 'bg-brand-primary'
    return <div aria-hidden className={`animate-pulse rounded-lg ${background} motion-reduce:animate-none ${className}`} />
}

// Wraps a loading screen: announced once to screen readers, with the page's usual spacing
export function SkeletonPage({ children, label = 'Loading', className = '' }) {
    return (
        <div role='status' aria-live='polite' className={`mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10 ${className}`}>
            <span className='sr-only'>{label}…</span>
            {children}
        </div>
    )
}

// Page title area: small label, title and description
export function SkeletonHeader({ withIcon = true, withAction = false }) {
    return (
        <div className='flex flex-wrap items-end justify-between gap-4'>
            <div className='flex items-start gap-4'>
                {withIcon && <Bone className='h-12 w-12 rounded-xl' />}
                <div className='flex flex-col gap-2'>
                    <Bone className='h-3 w-24' />
                    <Bone className='h-8 w-56 sm:w-72' />
                    <Bone className='h-4 w-40' />
                </div>
            </div>
            {withAction && <Bone className='h-11 w-36 rounded-full' />}
        </div>
    )
}

// White card in the app's card style
export function SkeletonCard({ children, className = '' }) {
    return <div className={`rounded-2xl border border-brand-secondary bg-white p-5 sm:p-6 ${className}`}>{children}</div>
}

// A list row: icon tile, two lines of text and a pill on the right
export function SkeletonRow({ withPill = true }) {
    return (
        <div className='flex items-center gap-4 rounded-xl border border-brand-secondary bg-white p-4'>
            <Bone className='h-11 w-11 shrink-0 rounded-xl' />
            <div className='flex flex-1 flex-col gap-2'>
                <Bone className='h-4 w-2/3 max-w-xs' />
                <Bone className='h-3 w-1/3 max-w-[10rem]' />
            </div>
            {withPill && <Bone className='h-8 w-20 shrink-0 rounded-full' />}
        </div>
    )
}

// A titled card holding a few rows, like the dashboard sections
export function SkeletonSection({ rows = 3 }) {
    return (
        <SkeletonCard className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Bone className='h-3 w-20' />
                <Bone className='h-6 w-48' />
            </div>
            {Array.from({ length: rows }, (_, i) => <SkeletonRow key={i} withPill={false} />)}
        </SkeletonCard>
    )
}

// A few lines of paragraph text, the last one shorter
export function SkeletonText({ lines = 3 }) {
    return (
        <div className='flex flex-col gap-2'>
            {Array.from({ length: lines }, (_, i) =>
                <Bone key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />)}
        </div>
    )
}
