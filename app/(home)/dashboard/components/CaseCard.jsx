import { ChevronRight, Triangle } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function CaseCard({ href, title, type, level, result }) {
    return (
        <Link href={href} className="group block cursor-pointer rounded-xl border border-[#F0F4FE] bg-brand-primary p-4 transition-all duration-200 hover:border-light-blue/30 hover:bg-brand-secondary hover:shadow-sm">

            <div className="flex items-center justify-between gap-4"> 
                <div className="min-w-0">

                    <div className="flex items-center gap-2">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-light-blue/10">
                            <Triangle className="h-4 w-4 fill-light-blue text-light-blue" />
                        </div>

                        <h3 className="truncate font-medium text-gray-900">
                            {title}
                        </h3>

                    </div>

                    <div className="mt-2 ml-10 flex items-center gap-2 text-sm text-Secondary-Text">
                        <span>{type}</span>
                        <span className="text-gray-300">•</span>
                        <span>{level}</span>
                    </div>

                </div>
 
                <div className="flex shrink-0 items-center gap-2">

                    {result !== undefined && result !== null && (
                        <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-light-blue/10 px-2 text-lg font-semibold text-light-blue">
                            {result}
                        </div>
                    )}

                    <ChevronRight
                        className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-light-blue"
                    />

                </div>

            </div>

        </Link>
    )
}
