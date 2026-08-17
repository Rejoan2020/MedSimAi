import { LineChart, LineDotRightHorizontal, LineStyle } from 'lucide-react'
import React from 'react'

export default function Note() {
    return (
        <div>
            <div className='h-14 w-80 border mt-4 flex justify-center items-center border border-[#F0F4FE] rounded-full bg-[#FFFFFF]'>
                <div className='border h-10 w-38 rounded-full flex justify-center items-center bg-[#6796F2] text-white'>Notes</div>
                <div className='border-0 h-10 w-38 rounded-full flex justify-center items-center'>Inventions</div>
            </div>
            <div className='border rounded-lg border-gray-200 p-4 text-Secondary-Text'>
                <div className='border-b border-gray-200 p-2'>Note title</div> 
                <textarea className='border-gray-200 p-2 outline-none min-h-[calc(100vh-20rem)] min-w-full'
                    placeholder='Take a note...'
                />
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2'>
                        <div className='border p-2 rounded'>B</div>
                        <div className='border p-2 rounded'>U</div>
                        <LineStyle className='h-10 w-8 border p-2 rounded' />
                        <LineDotRightHorizontal className='h-10 w-8 border p-2 rounded' />
                    </div>
                    <div className='flex gap-2 text-white'>
                        <div className='border p-2 rounded-lg bg-light-blue'>Discard</div>
                        <div className='border p-2 rounded-lg bg-light-blue'>Save</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
