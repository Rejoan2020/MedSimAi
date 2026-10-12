'use client'

import dynamic from 'next/dynamic'

// react-pdf needs browser APIs, so render client-side only
const PDFReader = dynamic(() => import('./PDFReader'), {
    ssr: false,
    loading: () => (
        <div className='flex h-full items-center justify-center rounded-2xl border border-brand-secondary bg-white text-sm text-gray-500'>
            Loading document...
        </div>
    ),
})

export default function CaseDocument({ file }) {
    return <PDFReader file={file} />
}
