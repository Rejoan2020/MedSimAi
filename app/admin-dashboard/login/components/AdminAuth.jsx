'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { Lock, Mail, User } from 'lucide-react'
import AuthField from '@/app/components/AuthField'
import { adminLogout, adminSignin, adminSignup } from '@/app/actions/auth'

const buttonClass = 'border p-2 flex justify-center items-center bg-light-blue text-white rounded-md cursor-pointer disabled:opacity-60'

function SignInForm() {
    const [state, formAction, pending] = useActionState(adminSignin, null)
    return (
        <form action={formAction} className='flex flex-col gap-4'>
            <AuthField label='Email address' icon={Mail} name='email' type='email' autoComplete='email' />
            <AuthField label='Password' icon={Lock} name='password' type='password' autoComplete='current-password' />
            {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
            <button type='submit' disabled={pending} className={buttonClass}>
                {pending ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
    )
}

function SignUpForm() {
    const [state, formAction, pending] = useActionState(adminSignup, null)
    return (
        <form action={formAction} className='flex flex-col gap-4'>
            <p className='rounded-lg bg-blue-50 p-3 text-sm text-deep-blue'>
                No admin account exists yet. The first account created here becomes the admin; after that,
                new admins are added from the Users page.
            </p>
            <AuthField label='Full name' icon={User} name='name' autoComplete='name' />
            <AuthField label='Email address' icon={Mail} name='email' type='email' autoComplete='email' />
            <AuthField label='Password (8+ characters)' icon={Lock} name='password' type='password' minLength={8} autoComplete='new-password' />
            <AuthField label='Confirm password' icon={Lock} name='confirmPassword' type='password' minLength={8} autoComplete='new-password' />
            {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
            <button type='submit' disabled={pending} className={buttonClass}>
                {pending ? 'Creating account...' : 'Create admin account'}
            </button>
        </form>
    )
}

export default function AdminAuth({ allowSignup, signedInAs }) {
    const [mode, setMode] = useState(allowSignup ? 'signup' : 'signin')

    return (
        <div className='flex min-h-full w-full items-center justify-center p-8'>
            <div className='flex w-full max-w-92 flex-col gap-8'>
                <Image height={32} width={162} alt='logo' src={'/logo/medsimailogo.png'} className='h-8 w-40' />
                <div>
                    <div className='text-[32px]'>MedSimAI Admin</div>
                    <div className='text-Secondary-Text'>Manage cases, announcements, FAQ and users.</div>
                </div>

                {signedInAs &&
                    <div className='flex flex-col gap-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800'>
                        You&apos;re signed in as {signedInAs}, which isn&apos;t an admin account.
                        Sign out to sign in with an admin account.
                        <form action={adminLogout}>
                            <button type='submit' className='underline cursor-pointer'>Sign out</button>
                        </form>
                    </div>}

                {allowSignup &&
                    <div className='grid grid-cols-2 rounded-lg border border-gray-200 text-sm'>
                        {[['signup', 'Create admin account'], ['signin', 'Sign in']].map(([value, label]) =>
                            <button
                                key={value}
                                type='button'
                                onClick={() => setMode(value)}
                                className={`rounded-lg py-2 cursor-pointer ${mode === value ? 'bg-light-blue text-white' : ''}`}
                            >
                                {label}
                            </button>)}
                    </div>}

                {mode === 'signup' && allowSignup ? <SignUpForm /> : <SignInForm />}

                {!allowSignup &&
                    <div className='text-sm text-Secondary-Text'>
                        Need an admin account? Ask an existing admin to create one for you from the Users page.
                    </div>}
            </div>
        </div>
    )
}
