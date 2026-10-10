import React from 'react'
import Announcements from './components/Announcements'
import { getAnnouncements } from '@/lib/content'

export default async function page() {
  const announcements = await getAnnouncements();
  return (
    <Announcements announcements={announcements} />
  )
}
