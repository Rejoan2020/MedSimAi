'use client'
import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { useState } from 'react'

export default function Cases() {
    const [keyword, setKeyword] = useState('');
    return (
        <div className='w-full flex flex-col items-center p-8 gap-8'>
            <div className='flex justify-between w-full max-w-300'>
                <div>
                    <div className='font-bold text-[24px]'>Clinical Cases</div>
                    <div className='text-Secondary-Text'>XYZ College of Medicine</div>
                </div>
                <div>
                    <div className='text-right font-bold text-[24px]'>40</div>
                    <div className='text-Secondary-Text'>Cases available</div>
                </div>
            </div>
            <div className='flex w-full gap-2'>
                <Search keyword={keyword} setKeyword={setKeyword}/>
                <Filter />
            </div>

        </div>

    )
}
