import React from 'react'
import { notFound } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import CaseForm from '@/app/admin-dashboard/components/CaseForm'
import { requireAdminPage } from '@/lib/currentUser'
import { dbconnect } from '@/lib/mongo'
import Case from '@/models/Case'

export default async function page({ params }) {
  await requireAdminPage();

  const { id } = await params;
  if (!isValidObjectId(id)) notFound();

  await dbconnect();
  const clinicalCase = await Case.findById(id).lean();
  if (!clinicalCase) notFound();

  return (
    <div className='max-w-300 min-w-150'>
      <CaseForm initialCase={JSON.parse(JSON.stringify(clinicalCase))} />
    </div>
  )
}
