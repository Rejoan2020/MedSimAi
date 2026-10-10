import React from 'react'

// Consistent page width and spacing for signed-in pages
export function PageContainer({ children, className = '' }) {
    return (
        <div className={`mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 ${className}`}>
            {children}
        </div>
    )
}

// Page title with optional description and actions on the right
export default function PageHeader({ title, description, icon: Icon, actions }) {
    return (
        <div className='flex flex-wrap items-start justify-between gap-4'>
            <div className='flex min-w-0 items-start gap-3'>
                {Icon &&
                    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-light-blue/10'>
                        <Icon className='h-5 w-5 text-light-blue' />
                    </div>}
                <div className='min-w-0'>
                    <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>
                    {description && <p className='mt-1 text-sm text-Secondary-Text'>{description}</p>}
                </div>
            </div>
            {actions && <div className='flex flex-wrap items-center gap-2'>{actions}</div>}
        </div>
    )
}
