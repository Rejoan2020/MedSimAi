import React from 'react'
import Link from 'next/link'
import CaseTable from '../components/CaseTable'
import { getAdminOverview } from '@/lib/stats'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const { cases } = await getAdminOverview();

  return (
    <div className='p-10 w-full flex flex-col gap-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <div className='text-[28px] font-medium'>Cases</div>
          <div className='text-[#717680]'>Only published cases are visible to students.</div>
        </div>
        <Link href='/admin-dashboard/create-new-case' className='border p-2 bg-green-500 text-white rounded-lg'>
          Create a new case
        </Link>
      </div>
      <div className='border-1 border-[#F0F4FE] rounded-xl p-4 overflow-x-auto'>
        <CaseTable cases={cases} />
      </div>
    </div>
  )
}
