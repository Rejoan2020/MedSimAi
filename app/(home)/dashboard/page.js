import React from 'react'
import { redirect } from 'next/navigation';
import Dashboard from './components/Dashboard'
import { getCurrentUser } from '@/lib/currentUser';
import { getStudentDashboard } from '@/lib/stats';

export default async function page() {
  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const data = await getStudentDashboard(user._id);
  return (
    <Dashboard name={user.name} data={data} />
  )
}
