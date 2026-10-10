import React from 'react'
import FaqManager from '@/app/admin-dashboard/components/FaqManager'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'
import { getFaqs } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const faqs = await getFaqs();

  return (
    <PageContainer>
      <PageHeader title='Help & FAQ' description='Shown to students on the Help & FAQ page, in this order.' />
      <FaqManager faqs={faqs} />
    </PageContainer>
  )
}
