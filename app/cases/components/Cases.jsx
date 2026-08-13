'use client'
import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { useState } from 'react'
import Levels from './Levels'
import Modal from './Modal'

export default function Cases() {
    const [keyword, setKeyword] = useState('');
    const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
    return (
        <div className='w-full flex flex-col items-center p-8 gap-6'>
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
            <div className='flex w-full max-w-300 gap-2'>
                <Search keyword={keyword} setKeyword={setKeyword}/>
                <Filter />
            </div>
            <Modal />
            <div className='flex w-full max-w-300 gap-2'>
                {levels.map((lvl,index) => <Levels key={index} title={lvl}/>)} 
            </div>
        </div>

    )
}
