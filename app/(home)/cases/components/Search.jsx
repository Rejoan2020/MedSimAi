'use client'
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'

export default function Search({ keyword, setKeyword }) {
    return (
        <div className='w-full flex border items-center p-4 border-1 border-deep-blue rounded-lg outline-none focus-within:border-light-blue focus-within:ring-2 focus-within:ring-deep-blue/10'>
            <SearchIcon className='w-6 h-6'/>
            <input
                type="text"
                placeholder="Search clinical cases..."
                className='w-full flex items-center px-4 rounded-lg outline-none'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>

    )
}
