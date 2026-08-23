import React from 'react'
import Sidebar from '../components/Sidebar'

export default function layout({ children }) {
    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
