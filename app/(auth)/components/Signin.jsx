'use client'
import { signin } from '@/app/actions/auth';
import AuthField from '@/app/components/AuthField';
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { useActionState } from 'react';

export default function Signin() {
    const [state, formAction, pending] = useActionState(signin, null);
    return (
        <div className='grid xl:grid-cols-2 items-center w-full h-full'>
            <div className='flex w-full flex-col items-center gap-10 px-4 py-10 sm:gap-14'>
                <Image height={32} width={182} alt='MedSimAI' src={'/logo/medsimailogo.png'}
                    className='h-8 w-[182px]' />
                <div className='w-full max-w-92'>
                    <div className='text-3xl font-semibold sm:text-4xl'>Welcome to MedSimAI</div>
                    <div className='text-Secondary-Text'>Enter your email to sign in to your account.</div>
                </div>
                <form action={formAction} className='max-w-92 w-full flex flex-col gap-4'>
                    <AuthField label='Email address' icon={Mail} name='email' type='email' autoComplete='email' />
                    <AuthField label='Password' icon={Lock} name='password' type='password' autoComplete='current-password' />
                    {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
                    <button
                        type='submit'
                        disabled={pending}
                        className='border p-2 flex justify-center items-center bg-light-blue text-white rounded-md cursor-pointer disabled:opacity-60'
                    >
                        {pending ? 'Signing in...' : 'Sign in'}
                    </button>

                    <div className='text-Secondary-Text'>
                        Don&apos;t have an account? <Link href='/signup' className='text-light-blue hover:underline'>Sign up</Link>
                    </div>
                </form>


            </div>

            <div className='w-full h-full hidden xl:block '>
                <Image height={800} width={600} alt='image' src={'/logo/sidelogin.svg'} className='h-full' />
            </div>
        </div>
    )
}
