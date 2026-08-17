'use client'
import { Key, Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='grid xl:grid-cols-2 items-center w-full h-full'>
            <div className='flex flex-col w-full items-center gap-16'>
                <Image height={32} width={162} alt='logo' src={'/logo/medsimailogo.png'}
                    className='h-8 w-40' />
                <div>
                    <div className='text-[36px]'>Welcome to MedSimAI</div>
                    <div className='text-Secondary-Text'>Enter your email to sign in to your account.</div>
                </div>
                <div className='max-w-92 w-full flex flex-col gap-4'>
                    <div>
                        <div>Email address</div>
                        <div className='border flex items-center w-full px-2 border-gray-200 rounded-lg'>
                            <Mail />
                            <input
                                name='email'
                                value={email}
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='h-12 outline-none px-4 w-full'>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div>Password</div>
                        <div className='border flex items-center w-full px-2 border-gray-200 rounded-lg'>
                            <Lock />
                            <input
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className='h-12 outline-none px-4 w-full'>
                            </input>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='border p-2 flex justify-center items-center bg-light-blue text-white rounded-md cursor-pointer'>
                        Sign in
                    </button>
                    <div className='text-Secondary-Text'>Don't have an account? contact institution</div>
                </div>

            </div>

            <div className='w-full h-full hidden xl:block '>
                <Image height={800} width={600} alt='image' src={'/sidelogin.svg'} className='h-full' />
            </div>
        </div>
    )
}
