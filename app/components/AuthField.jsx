import React from 'react'

// A labelled input with an icon, shared by the sign-in and sign-up forms
export default function AuthField({ label, icon: Icon, ...inputProps }) {
    return (
        <label className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>{label}</span>
            <span className='flex w-full items-center rounded-xl border border-brand-secondary bg-white px-3 text-Secondary-Text focus-within:border-light-blue focus-within:ring-2 focus-within:ring-light-blue/20'>
                {Icon && <Icon />}
                <input className='h-12 outline-none px-4 w-full' required {...inputProps} />
            </span>
        </label>
    )
}
