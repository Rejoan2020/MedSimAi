'use client'

import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function PDFReader({ file }) {
  const containerRef = useRef(null)

  const [numPages, setNumPages] = useState(null)
  const [pageWidth, setPageWidth] = useState(null)
  
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width

      setPageWidth(width - 48)
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-100">

      <div className="flex shrink-0 items-center justify-between border-b bg-white px-4 py-3">

        <div className="text-sm font-medium text-gray-700">
          Case Document
        </div>

        <div className="text-sm text-gray-500">
          {numPages ? `${numPages} pages` : 'Loading...'}
        </div>

      </div>


      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6"
      >

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}

          loading={
            <div className="flex h-40 items-center justify-center text-sm text-gray-500">
              Loading PDF...
            </div>
          }

          error={
            <div className="flex h-40 items-center justify-center text-sm text-red-500">
              Failed to load PDF.
            </div>
          }
        >

          {numPages &&
            Array.from({ length: numPages }, (val, index) => (
              <div
                key={index}
                className="mb-6 flex justify-center"
              >
                {pageWidth && (
                  <Page
                    pageNumber={index + 1}
                    width={pageWidth}
                  />
                )}
              </div>
            ))
          }

        </Document>

      </div>

    </div>
  )
}