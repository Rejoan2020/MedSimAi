import { FilterIcon } from 'lucide-react'
import React from 'react'


export default function Filter({isModalOpen, setIsModalOpen}) {
    return (
        <div
            className='flex border bg-[linear-gradient(to_right,#FFFDFC,#F8FDFF,#F7FAFF)] items-center p-4 border-1 border-deep-blue rounded-lg cursor-pointer hover:border-light-blue hover:text-deep-blue/80'
            onClick={()=>setIsModalOpen(!isModalOpen)}
        >
            <FilterIcon className='w-6 h-6' />
            <div>Filters</div>
        </div>
    )
}
