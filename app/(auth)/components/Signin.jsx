'use client'
import { signin } from '@/app/actions/auth';
import AuthField from '@/app/components/AuthField';
import AuthHero from '@/app/components/AuthHero';
import DemoAccess from '@/app/components/DemoAccess';
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { useActionState } from 'react';

export default function Signin({ demo }) {
    const [state, formAction, pending] = useActionState(signin, null);
    return (
        <div className='grid min-h-full w-full items-center lg:grid-cols-2'>
            <div className='flex w-full flex-col items-center gap-10 px-4 py-10 sm:gap-14'>
                <div className='w-full max-w-92'>
                    <Image height={32} width={182} alt='MedSimAI' src={'/logo/medsimailogo.png'}
                        className='mb-10 h-8 w-[182px]' />
                    <div className='eyebrow'>{'Welcome back'}</div>
                    <div className='mt-1 text-3xl font-bold sm:text-4xl'>Sign in to MedSimAI</div>
                    <div className='mt-2 text-Secondary-Text'>Enter your email and password to continue.</div>
                </div>
                <form action={formAction} className='max-w-92 w-full flex flex-col gap-4'>
                    <AuthField label='Email address' icon={Mail} name='email' type='email' autoComplete='email' />
                    <AuthField label='Password' icon={Lock} name='password' type='password' autoComplete='current-password' />
                    {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
                    <button
                        type='submit'
                        disabled={pending}
                        className='flex items-center justify-center rounded-full bg-light-blue px-5 py-3 font-semibold text-white hover:bg-primary-dark cursor-pointer disabled:opacity-60'
                    >
                        {pending ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className='text-Secondary-Text'>
                        Don&apos;t have an account? <Link href='/signup' className='text-light-blue hover:underline'>Sign up</Link>
                    </div>
                </form>

                {demo &&
                    <div className='-mt-4 w-full max-w-92 sm:-mt-8'>
                        <DemoAccess />
                    </div>}

            </div>

            <AuthHero />
        </div>
    )
}
