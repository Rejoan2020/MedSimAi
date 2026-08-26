import React from 'react'
import Header from './components/Header'
import Note from './components/Note'
import { dbconnect } from '@/lib/mongo';

export default async function page({ params }) {
    await dbconnect();
    const { id } = await params;
    
    return (
        <div className='w-full flex flex-col items-center p-8 gap-4'>
            <Header id={id} />
            <div className='sm:flex w-full max-w-350'>
                <div className='sm:hidden border mt-4 ml-4 w-full h-70 w-70 rounded-lg border-gray-200'>
                    <div className='flex justify-center items-center h-full'>Simulated AI patient</div>
                </div>
                <Note />
                <div className='max-sm:hidden border mt-4 ml-4 w-full min-w-100 rounded-lg border-gray-200'>
                    <div className='flex justify-center items-center h-full'>Simulated AI patient</div>
                </div>
            </div>
        </div>
    )
}
