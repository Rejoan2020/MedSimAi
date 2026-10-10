'use client'
import { ArrowLeft, Clock, NotebookPen, StopCircle } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

export default function Header({ slug, title, attemptId, onToggleNotes }) {
    const [seconds, setSeconds] = useState(0);
    const [isStopping, setIsStopping] = useState(false);
    const [error, setError] = useState('');
    const isCompletedRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                return prev + 1;
            })
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    async function handleSession() {
        if (isStopping) return;

        setIsStopping(true);
        setError('');

        try {
            // On a retry the attempt may already be completed; only feedback is left to do
            if (!isCompletedRef.current) {
                const completeResponse = await fetch(`/api/attempts/${attemptId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: 'completed' })
                });
                const completeData = await completeResponse.json();

                if (!completeResponse.ok || !completeData.success) {
                    throw new Error(
                        completeData.message || "Failed to complete attempt"
                    );
                }
                isCompletedRef.current = true;
            }

            const feedbackResponse = await fetch(
                `/api/attempts/${attemptId}/feedback`,
                {
                    method: "POST",
                }
            );

            const feedbackData = await feedbackResponse.json();

            if (!feedbackResponse.ok || !feedbackData.success) {
                throw new Error(
                    feedbackData.message || "Failed to generate feedback"
                );
            } 

            router.push(`/cases/${slug}/feedback/${attemptId}`);
        } catch (error) {
            console.error(error);
            setError("Couldn't end the session. Please try again.");
            setIsStopping(false);
        }
    }
    return (
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-2'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <Link href={`/cases/${slug}`} className='flex min-w-0 items-center gap-2 font-medium hover:text-deep-blue'>
                    <ArrowLeft className='h-5 w-5 shrink-0' />
                    <span className='truncate'>{title}</span>
                </Link>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm tabular-nums text-Secondary-Text ring-1 ring-gray-200' aria-label='Session time'>
                        <Clock className='h-4 w-4' />
                        {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
                    </div>
                    <button
                        type='button'
                        onClick={onToggleNotes}
                        className='flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200 hover:bg-gray-50 cursor-pointer lg:hidden'
                    >
                        <NotebookPen className='h-4 w-4' /> Notes
                    </button>
                    <button
                        className='flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
                        onClick={handleSession}
                        disabled={isStopping}
                    >
                        <StopCircle className='h-4 w-4' />
                        {isStopping ? 'Ending...' : 'Stop session'}
                    </button>
                </div>
            </div>
            {error && <p className='text-right text-sm text-red-600'>{error}</p>}
        </div>
    )
}
