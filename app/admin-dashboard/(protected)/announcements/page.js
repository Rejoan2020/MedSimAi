import React from 'react'
import AnnouncementManager from '@/app/admin-dashboard/components/AnnouncementManager'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'
import { getAnnouncements } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  await requireAdminPage();
  const announcements = await getAnnouncements({ includeHidden: true });

  return (
    <PageContainer>
      <PageHeader eyebrow='Admin' title='Announcements' description='Shown to students on the Announcements page, newest first.' />
      <AnnouncementManager announcements={announcements} />
    </PageContainer>
  )
}
