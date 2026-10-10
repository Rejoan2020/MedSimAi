import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import CaseTable from '@/app/admin-dashboard/components/CaseTable'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'
import { getAdminOverview } from '@/lib/stats'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const { cases } = await getAdminOverview();

  return (
    <PageContainer>
      <PageHeader
        title='Cases'
        description='Only published cases are visible to students.'
        actions={
          <Link href='/admin-dashboard/create-new-case' className='inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-500'>
            <Plus className='h-4 w-4' /> New case
          </Link>
        }
      />
      <div className='rounded-xl border border-gray-200 bg-white'>
        <CaseTable cases={cases} />
      </div>
    </PageContainer>
  )
}
