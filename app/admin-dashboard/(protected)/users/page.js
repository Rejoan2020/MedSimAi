import React from 'react'
import UserManager from '@/app/admin-dashboard/components/UserManager'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'
import { getUsersWithStats } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  const admin = await requireAdminPage();
  const users = await getUsersWithStats();

  return (
    <PageContainer>
      <PageHeader eyebrow='Admin' title='Users' description='Students can also sign up themselves at /signup. Create accounts for other admins here.' />
      <UserManager users={users} currentUserId={admin._id.toString()} />
    </PageContainer>
  )
}
