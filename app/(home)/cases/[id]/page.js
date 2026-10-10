
import React from 'react'
import PDFReader from './components/PDFReader'
import ConfidenceRatings from './components/ConfidenceRatings'
import ConsultationPlan from './components/ConsultationPlan'
import { Clock, PersonStanding } from 'lucide-react'
import Image from 'next/image'
import { startSession } from '@/app/actions/session';
import { getPublicCaseBySlug } from '@/lib/cases';
import { getCurrentUser, isAdmin } from '@/lib/currentUser';
import CasePrep from '@/models/CasePrep';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const patient = await getPublicCaseBySlug(id, { includeDrafts: isAdmin(user) });
  if (!patient) notFound();
  const caseId = patient._id;

  // The student's saved confidence ratings and consultation plan for this case
  const prep = await CasePrep.findOne({ user: user._id, case: caseId }).lean();
  const initialRatings = prep?.confidence ? Object.fromEntries(Object.entries(prep.confidence)) : {};

  const age = patient.aiScenario?.patient?.age;

  return (
    <div className="min-h-screen text-black flex flex-col justify-center items-center p-8 gap-6 sm:min-w-200 w-full">
      {!patient.isPublished &&
        <div className='w-full max-w-350 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800'>
          Draft: only admins can see this case. Publish it from the admin dashboard to make it available to students.
        </div>}
      <div className='flex justify-between max-w-350 w-full'>
        <div className='sm:flex'>
          <div className='flex justify-between'>
            <Image height={100} width={200} alt={patient.title} src={patient.image || '/cases/person.png'}
              className='h-30 w-36 object-cover rounded-lg'
            />
            <form action={startSession} className='sm:hidden'>
              <input type="hidden" name="caseId" value={caseId} />

              <button
                type="submit"
                className="border bg-light-blue h-12 w-36 p-2 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500"
              >
                Start Session
              </button>
            </form>
          </div>
          <div className="px-4 p-2 flex flex-col gap-2 max-w-350 sm:min-w-100">
            <h1 className="text-xl font-semibold">
              {patient.title}
            </h1>
            <div className='text-Secondary-Text'>{patient.description}</div>
            <div className='flex gap-1 text-blue-800'>
              <div className='flex justify-center items-center border rounded-lg p-1 bg-blue-100/30'>{patient.difficulty}</div>
              <div className='flex justify-center items-center border rounded-lg p-1 bg-blue-100/30'><Clock className='w-4 h-4' /> <div>{patient.duration}</div></div>
              {age != null &&
                <div className='border rounded-lg flex p-1 items-center justify-center bg-blue-100/30'>
                  <PersonStanding />
                  <div>{age >= 18 ? 'Adult' : 'Pediatric patient'}</div>
                </div>}
            </div>
          </div>
        </div>

        <form action={startSession} className='max-sm:hidden'>
          <input type="hidden" name="caseId" value={caseId} />

          <button
            type="submit"
            className="border bg-light-blue h-12 w-36 p-2 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500"
          >
            Start Session
          </button>
        </form>

      </div>

      <div className='flex flex-col gap-4 justify-between border border-gray-200 rounded-lg m-2 p-8 w-full max-w-350'>
        <h1 className="text-xl font-semibold text-blue-800">
          Clinical Scenario
        </h1>
        <div>
          {patient.description}
        </div>
      </div>

      <div className="grid h-[calc(100vh-10rem)] sm:grid-cols-2 gap-6 p-6 w-full max-w-350">

        <div className="min-h-0 overflow-hidden w-full">
          {patient.pdfUrl
            ? <PDFReader file={patient.pdfUrl} />
            : <div className='flex h-full items-center justify-center rounded-xl border border-gray-200 text-Secondary-Text'>No case document for this case.</div>}
        </div>

        <div className="min-h-0 overflow-y-auto rounded-xl border border-gray-200 bg-gray-100/20 p-6 max-w-150">
          <ConfidenceRatings caseId={caseId} initialRatings={initialRatings} />
        </div>

      </div>

      <div className='w-full max-w-350'>
        <ConsultationPlan caseId={caseId} initialPlan={prep?.plan ?? ''} />
      </div>

    </div>
  )
}
