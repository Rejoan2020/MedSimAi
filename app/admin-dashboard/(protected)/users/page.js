import React from 'react'
import UserManager from '@/app/admin-dashboard/components/UserManager'
import { getUsersWithStats } from '@/lib/content'
import { requireAdminPage } from '@/lib/currentUser'

export default async function page() {
  const admin = await requireAdminPage();
  const users = await getUsersWithStats();

  return (
    <div className='p-10 w-full flex flex-col gap-6'>
      <div>
        <div className='text-[28px] font-medium'>Users</div>
        <div className='text-[#717680]'>Students can also sign up themselves at /signup. Create accounts for other admins here.</div>
      </div>
      <UserManager users={users} currentUserId={admin._id.toString()} />
    </div>
  )
}
