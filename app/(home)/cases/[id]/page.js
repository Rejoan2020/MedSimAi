
import React from 'react'
import CaseDocument from './components/CaseDocument'
import ConfidenceRatings from './components/ConfidenceRatings'
import ConsultationPlan from './components/ConsultationPlan'
import { ArrowLeft, Clock, PersonStanding, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { startSession } from '@/app/actions/session';
import { getPublicCaseBySlug } from '@/lib/cases';
import { getCurrentUser, isAdmin } from '@/lib/currentUser';
import CasePrep from '@/models/CasePrep';
import { getStudentAttempts } from '@/lib/stats';
import AttemptList from '../../components/AttemptList';
import { PageContainer } from '@/app/components/PageHeader';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) redirect('/signin');

  const patient = await getPublicCaseBySlug(id, { includeDrafts: isAdmin(user) });
  if (!patient) notFound();
  const caseId = patient._id;

  // The student's saved confidence ratings and consultation plan for this case
  const [prep, attempts] = await Promise.all([
    CasePrep.findOne({ user: user._id, case: caseId }).lean(),
    getStudentAttempts(user._id, { caseId }),
  ]);
  // The newest unfinished attempt at this case, if any (attempts are newest first)
  const inProgress = attempts.find((a) => a.status === 'started') ?? null;
  const initialRatings = prep?.confidence ? Object.fromEntries(Object.entries(prep.confidence)) : {};

  const age = patient.aiScenario?.patient?.age;
  const badges = [
    patient.difficulty,
    patient.duration && <><Clock className='h-3.5 w-3.5' /> {patient.duration}</>,
    age != null && <><PersonStanding className='h-3.5 w-3.5' /> {age >= 18 ? 'Adult' : 'Pediatric'}</>,
  ].filter(Boolean);

  return (
    <PageContainer>
      <Link href='/cases' className='inline-flex w-fit items-center gap-1 text-sm text-Secondary-Text hover:text-deep-blue'>
        <ArrowLeft className='h-4 w-4' /> All cases
      </Link>

      {!patient.isPublished &&
        <div className='rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800'>
          Draft: only admins can see this case. Publish it from the admin dashboard to make it available to students.
        </div>}

      <section className='flex flex-col gap-5 rounded-2xl border border-brand-secondary bg-white p-4 sm:flex-row sm:items-center sm:p-6'>
        <div className='relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-brand-primary ring-1 ring-brand-secondary'>
          <Image fill alt='' src={patient.image || '/cases/person.png'} sizes='112px' className='object-cover object-[center_25%]' />
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          {patient.specialty && <div className='eyebrow'>{patient.specialty}</div>}
          <h1 className="text-2xl font-bold sm:text-3xl">{patient.title}</h1>
          <p className='text-Secondary-Text'>{patient.description}</p>
          <div className='flex flex-wrap gap-2 text-xs'>
            {badges.map((badge, i) =>
              <span key={i} className='inline-flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-1 text-deep-blue'>{badge}</span>)}
          </div>
        </div>
        {/* With an unfinished attempt, resuming it is the main action; starting over is secondary */}
        {inProgress
          ? <div className='flex flex-col items-stretch gap-2 sm:shrink-0 sm:items-end'>
            <Link
              href={`/cases/${patient.slug}/active-session?attempt=${inProgress.attemptId}`}
              className="flex items-center justify-center gap-2 rounded-full bg-light-blue px-5 py-3 font-medium text-white hover:bg-primary-dark"
            >
              <Play className='h-4 w-4' /> Resume session
            </Link>
            <form action={startSession}>
              <input type="hidden" name="caseId" value={caseId} />
              <button type="submit" className="w-full text-sm font-medium text-light-blue hover:text-primary-dark cursor-pointer sm:w-auto">
                Start new attempt
              </button>
            </form>
          </div>
          : <form action={startSession} className='sm:shrink-0'>
            <input type="hidden" name="caseId" value={caseId} />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-light-blue px-5 py-3 font-medium text-white hover:bg-blue-500 cursor-pointer sm:w-auto"
            >
              <Play className='h-4 w-4' /> Start Session
            </button>
          </form>}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="h-[70vh] min-h-96 lg:col-span-3">
          {patient.pdfUrl
            ? <CaseDocument file={patient.pdfUrl} />
            : <div className='flex h-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-Secondary-Text'>No case document for this case.</div>}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <ConfidenceRatings caseId={caseId} initialRatings={initialRatings} />
          <ConsultationPlan caseId={caseId} initialPlan={prep?.plan ?? ''} />
        </div>
      </div>

      <section className='flex flex-col gap-4'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <div className='eyebrow'>Your practice</div>
            <h2 className='mt-0.5 text-xl font-bold'>Your attempts</h2>
          </div>
          {attempts.length > 5 &&
            <Link href={`/attempts?case=${patient.slug}`} className='text-sm font-medium text-light-blue hover:text-primary-dark'>
              View all {attempts.length}
            </Link>}
        </div>
        <AttemptList
          attempts={attempts.slice(0, 5)}
          showCase={false}
          emptyText="You haven't tried this case yet. Start a session when you're ready."
        />
      </section>
    </PageContainer>
  )
}
