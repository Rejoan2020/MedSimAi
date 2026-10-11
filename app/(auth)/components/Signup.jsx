'use client'
import { signup } from '@/app/actions/auth';
import AuthField from '@/app/components/AuthField';
import AuthHero from '@/app/components/AuthHero';
import { Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { useActionState } from 'react';

export default function Signup() {
    const [state, formAction, pending] = useActionState(signup, null);
    return (
        <div className='grid min-h-full w-full items-center lg:grid-cols-2'>
            <div className='flex w-full flex-col items-center gap-10 px-4 py-10 sm:gap-12'>
                <div className='w-full max-w-92'>
                    <Image height={32} width={182} alt='MedSimAI' src={'/logo/medsimailogo.png'}
                        className='mb-10 h-8 w-[182px]' />
                    <div className='eyebrow'>{'Get started'}</div>
                    <div className='mt-1 text-3xl font-bold sm:text-4xl'>Create your account</div>
                    <div className='mt-2 text-Secondary-Text'>Sign up to start practising clinical cases.</div>
                </div>
                <form action={formAction} className='max-w-92 w-full flex flex-col gap-4'>
                    <AuthField label='Full name' icon={User} name='name' autoComplete='name' />
                    <AuthField label='Email address' icon={Mail} name='email' type='email' autoComplete='email' />
                    <AuthField label='Password (8+ characters)' icon={Lock} name='password' type='password' minLength={8} autoComplete='new-password' />
                    <AuthField label='Confirm password' icon={Lock} name='confirmPassword' type='password' minLength={8} autoComplete='new-password' />
                    {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
                    <button
                        type='submit'
                        disabled={pending}
                        className='flex items-center justify-center rounded-full bg-light-blue px-5 py-3 font-semibold text-white hover:bg-primary-dark cursor-pointer disabled:opacity-60'
                    >
                        {pending ? 'Creating account...' : 'Sign up'}
                    </button>

                    <div className='text-Secondary-Text'>
                        Already have an account? <Link href='/signin' className='text-light-blue hover:underline'>Sign in</Link>
                    </div>
                </form>
            </div>

            <AuthHero />
        </div>
    )
}
