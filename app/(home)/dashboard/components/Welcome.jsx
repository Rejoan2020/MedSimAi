import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Welcome({ name }) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-brand-secondary bg-[linear-gradient(to_right,#FFFDFC,#F8FDFF,#F0F4FE)] p-6 sm:p-8'>
      <div className='min-w-0'>
        <div className='text-sm font-medium text-deep-blue'>Student Dashboard</div>
        <h1 className='mt-1 text-2xl font-bold text-light-blue sm:text-3xl'>Welcome back{name ? `, ${name}` : ''}</h1>
        <p className='mt-1 text-Secondary-Text'>Continue mastering clinical reasoning</p>
      </div>
      <Link href='/cases' className='inline-flex items-center gap-2 rounded-lg bg-deep-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-deep-blue/90'>
        Browse cases <ArrowRight className='h-4 w-4' />
      </Link>
    </div>
  )
}
