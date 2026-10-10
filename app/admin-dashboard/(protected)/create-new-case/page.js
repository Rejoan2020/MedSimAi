import React from 'react'
import CaseForm from '@/app/admin-dashboard/components/CaseForm'
import { PageContainer } from '@/app/components/PageHeader'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  return (
    <PageContainer>
      <CaseForm />
    </PageContainer>
  )
}
