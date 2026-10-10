import CaseForm from '@/app/admin-dashboard/components/CaseForm'
import React from 'react'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  return (
    <div className='max-w-300 min-w-150'>
      <CaseForm />
    </div>
  )
}
