import Image from 'next/image'
import React from 'react'

export default function Button({ title, down }) {
    return (
        <div className='bg-white flex gap-2 cursor-pointer'>
            {title}
            {down?
            <Image
                height={6}
                width={8}
                alt='dropdown'
                src={'/icons/Vector.svg'}
                className='flex justify-center items-center' />
            :<Image
                height={6}
                width={8}
                alt='dropup'
                src={'/icons/dropup.svg'}
                className='flex justify-center items-center' /> 
            }
        </div>
    )
}
