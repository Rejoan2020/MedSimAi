'use client'
import { signin } from '@/app/actions/auth';
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react';

export default function Signin() {
    const [email, setEmail] = useState("rejoan@gmail.com");
    const [pass, setPass] = useState("asdf");
    return (
        <div className='grid xl:grid-cols-2 items-center w-full h-full'>
            <div className='flex flex-col w-full items-center gap-16'>
                <Image height={32} width={162} alt='logo' src={'/logo/medsimailogo.png'}
                    className='h-8 w-40' />
                <div>
                    <div className='text-[36px]'>Welcome to MedSimAI</div>
                    <div className='text-Secondary-Text'>Enter your email to sign in to your account.</div>
                </div>
                <form action={signin} className='max-w-92 w-full flex flex-col gap-4'>
                    <div>
                        <div>Email address</div>
                        <div className='border flex items-center w-full px-2 border-gray-200 rounded-lg'>
                            <Mail />
                            <input
                                required
                                name='email'
                                type='email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className='h-12 outline-none px-4 w-full'>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div>Password</div>
                        <div className='border flex items-center w-full px-2 border-gray-200 rounded-lg'>
                            <Lock />
                            <input
                                required
                                name='password'
                                type='password'
                                value={pass}
                                onChange={(e) => { setPass(e.target.value) }}
                                className='h-12 outline-none px-4 w-full'>
                            </input>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='border p-2 flex justify-center items-center bg-light-blue text-white rounded-md cursor-pointer'

                    >
                        Sign in (Demo)
                    </button>

                    <div className='text-Secondary-Text'>Don't have an account? contact institution</div>
                </form>


            </div>

            <div className='w-full h-full hidden xl:block '>
                <Image height={800} width={600} alt='image' src={'/logo/sidelogin.svg'} className='h-full' />
            </div>
        </div>
    )
}
