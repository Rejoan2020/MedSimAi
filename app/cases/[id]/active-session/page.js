import React from 'react'
import Header from './components/Header'
import Note from './components/Note'

export default function page() {
    return (
        <div className='w-full flex flex-col items-center p-8 gap-4'>
            <Header />
            <div className='flex w-full max-w-300'>
                <Note />
                <div className='border mt-4 ml-4 w-full min-w-100 rounded-lg border-gray-200'>
                    <div className='flex justify-center items-center h-full'>Simulated AI patient</div>
                </div>
            </div>
        </div>
    )
}
