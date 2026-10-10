//For active session in f2f
// import React from 'react'
// import Header from './components/Header'
// import Note from './components/Note'
// import { dbconnect } from '@/lib/mongo';

// export default async function page({ params }) {
//     await dbconnect();
//     const { id } = await params;

//     return (
//         <div className='w-full flex flex-col items-center p-8 gap-4'>
//             <Header id={id} />
//             <div className='sm:flex w-full max-w-350'>
//                 <div className='sm:hidden border mt-4 ml-4 w-full h-70 w-70 rounded-lg border-gray-200'>
//                     <div className='flex justify-center items-center h-full'>Simulated AI patient</div>
//                 </div>
//                 <Note />
//                 <div className='max-sm:hidden border mt-4 ml-4 w-full min-w-100 rounded-lg border-gray-200'>
//                     <div className='flex justify-center items-center h-full'>Simulated AI patient</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React from 'react'
import Header from './components/Header'
import Note from './components/Note'
import ChatBox from './components/ChatBox'
import { notFound, redirect } from 'next/navigation'
import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { getCurrentUser } from '@/lib/currentUser'
import CaseAttempt from '@/models/CaseAttempt'

export default async function Page({ params, searchParams }) {
    const { id } = await params;
    const { attempt: attemptId } = await searchParams;

    const user = await getCurrentUser();
    if (!user) redirect('/signin');

    if (!isValidObjectId(id)) notFound();

    await dbconnect()

    // Load the attempt from the URL; without one, fall back to the newest in-progress attempt
    let caseAttempt = null;
    if (isValidObjectId(attemptId)) {
        caseAttempt = await CaseAttempt.findOne({ _id: attemptId, user: user._id, case: id });
    } else {
        caseAttempt = await CaseAttempt.findOne({ user: user._id, case: id, status: 'started' })
            .sort({ createdAt: -1 });
    }

    if (!caseAttempt) notFound();

    const caseId = caseAttempt.case.toString();

    if (caseAttempt.status === 'completed') {
        redirect(`/cases/${caseId}/feedback/${caseAttempt._id}`);
    }
    if (caseAttempt.status !== 'started') notFound();
 

    return (
        <div className="flex h-full min-h-0 w-full flex-col p-4 sm:p-6 lg:p-8">

            <Header id={id} attemptId = {caseAttempt._id?.toString()} caseId={caseId}/>

            <div className="mt-4 flex min-h-0 flex-1 w-full max-w-350 mx-auto gap-4">

                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 p-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-light-blue text-white font-semibold">
                            AI
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Simulated Patient
                            </h2>

                            <div className="flex items-center gap-2 text-xs text-Secondary-Text">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Patient is ready
                            </div>
                        </div>

                    </div>

                    <ChatBox caseId={id} userId={user._id?.toString()} attemptId = {caseAttempt._id?.toString()} />

                </main>

                <aside className="hidden lg:flex w-80 shrink-0 min-h-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">

                    <div className="shrink-0 border-b border-gray-200 p-4">
                        <h2 className="font-semibold">
                            Consultation Notes
                        </h2>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <Note />
                    </div>

                </aside>

            </div>

        </div>
    )
}
