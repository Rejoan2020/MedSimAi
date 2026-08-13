import { Triangle } from 'lucide-react'
import React from 'react'

export default function CaseCard({ title, type, level, result }) {
    return (
        <div className='border rounded-lg border-[#F0F4FE] p-4 bg-brand-primary cursor-pointer hover:bg-brand-secondary'>
            <div className='flex gap-2 justify-between items-center'>
                <div className='flex gap-1 items-center'>
                    <Triangle className='w-4 h-4'/>
                    <div>{title}</div>
                </div>
                <div>{result?
                <div className='text-[24px]'>{result}</div>:'>'}</div>
            </div>
            <div className='ml-7 text-Secondary-Text'>{type}.{level}</div>
        </div>
    )
}
