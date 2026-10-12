import { ChevronRight } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import SpecialtyIcon from '@/app/components/SpecialtyIcon'

export default function CaseCard({ href, title, type, level, meta, result }) {
    return (
        <Link
            href={href}
            className="group flex items-center justify-between gap-4 rounded-xl border border-brand-secondary bg-white p-4 transition-colors duration-200 hover:border-light-blue hover:bg-light-blue"
        >
            <div className="flex min-w-0 items-center gap-4">
                <SpecialtyIcon
                    specialty={type}
                    className="h-11 w-11 shrink-0 rounded-xl bg-brand-primary p-2.5 text-light-blue transition-colors group-hover:bg-white/15 group-hover:text-white"
                />
                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-deep-blue group-hover:text-white">{title}</h3>
                    <div className="mt-0.5 truncate text-sm text-Secondary-Text group-hover:text-white/85">
                        {meta ?? [type, level].filter(Boolean).join(' · ')}
                    </div>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
                {result !== undefined && result !== null && (
                    <div className="whitespace-nowrap rounded-full bg-brand-primary px-3 py-1 text-sm font-semibold text-light-blue group-hover:bg-white group-hover:text-light-blue">
                        {result}
                    </div>
                )}
                <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </div>
        </Link>
    )
}
