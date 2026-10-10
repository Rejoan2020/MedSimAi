'use client'

import dynamic from 'next/dynamic'

// react-pdf needs browser APIs (DOMMatrix), so the viewer is only rendered in the browser
const PDFReader = dynamic(() => import('./PDFReader'), {
    ssr: false,
    loading: () => (
        <div className='flex h-full items-center justify-center rounded-xl border border-gray-200 bg-white text-sm text-gray-500'>
            Loading document...
        </div>
    ),
})

export default function CaseDocument({ file }) {
    return <PDFReader file={file} />
}
