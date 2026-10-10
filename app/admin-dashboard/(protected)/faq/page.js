import React from 'react'
import FaqManager from '@/app/admin-dashboard/components/FaqManager'
import { getFaqs } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const faqs = await getFaqs();

  return (
    <div className='p-10 w-full flex flex-col gap-6'>
      <div>
        <div className='text-[28px] font-medium'>Help &amp; FAQ</div>
        <div className='text-[#717680]'>Shown to students on the Help &amp; FAQ page, in this order.</div>
      </div>
      <FaqManager faqs={faqs} />
    </div>
  )
}
