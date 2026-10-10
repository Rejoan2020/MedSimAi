import React from 'react'
import AnnouncementManager from '../components/AnnouncementManager'
import { getAnnouncements } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const announcements = await getAnnouncements({ includeHidden: true });

  return (
    <div className='p-10 w-full flex flex-col gap-6'>
      <div>
        <div className='text-[28px] font-medium'>Announcements</div>
        <div className='text-[#717680]'>Shown to students on the Announcements page, newest first.</div>
      </div>
      <AnnouncementManager announcements={announcements} />
    </div>
  )
}
