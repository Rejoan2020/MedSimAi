import React from 'react'
import PDFReader from './components/PDFReader';

export default async function page({params}) {
    const {id} = await params;
  return (
    <div className='text-black'>
        sldkjf
        <PDFReader file={'/cases/cardio-report.pdf'}/>
        asdfsd
    </div>
  )
}
