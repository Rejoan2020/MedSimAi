'use client'
import { signup } from '@/app/actions/auth';
import AuthField from '@/app/components/AuthField';
import { Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import { useActionState } from 'react';

export default function Signup() {
    const [state, formAction, pending] = useActionState(signup, null);
    return (
        <div className='grid xl:grid-cols-2 items-center w-full h-full'>
            <div className='flex w-full flex-col items-center gap-10 px-4 py-10 sm:gap-12'>
                <Image height={32} width={182} alt='MedSimAI' src={'/logo/medsimailogo.png'}
                    className='h-8 w-[182px]' />
                <div className='w-full max-w-92'>
                    <div className='text-3xl font-semibold sm:text-4xl'>Create your account</div>
                    <div className='text-Secondary-Text'>Sign up to start practising clinical cases.</div>
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
                        className='border p-2 flex justify-center items-center bg-light-blue text-white rounded-md cursor-pointer disabled:opacity-60'
                    >
                        {pending ? 'Creating account...' : 'Sign up'}
                    </button>

                    <div className='text-Secondary-Text'>
                        Already have an account? <Link href='/signin' className='text-light-blue hover:underline'>Sign in</Link>
                    </div>
                </form>
            </div>

            <div className='w-full h-full hidden xl:block '>
                <Image height={800} width={600} alt='image' src={'/logo/sidelogin.svg'} className='h-full' />
            </div>
        </div>
    )
}
