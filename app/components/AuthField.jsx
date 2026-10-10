import React from 'react'

// A labelled input with an icon, shared by the sign-in and sign-up forms
export default function AuthField({ label, icon: Icon, ...inputProps }) {
    return (
        <label className='flex flex-col gap-1'>
            <span>{label}</span>
            <span className='border flex items-center w-full px-2 border-gray-200 rounded-lg'>
                {Icon && <Icon />}
                <input className='h-12 outline-none px-4 w-full' required {...inputProps} />
            </span>
        </label>
    )
}
