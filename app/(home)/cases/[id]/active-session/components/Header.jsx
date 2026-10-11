'use client'
import { ArrowLeft, Clock, NotebookPen, StopCircle } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

// "04:05", or "1:02:03" once past an hour
function formatElapsed(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export default function Header({ slug, title, attemptId, startedAt, onToggleNotes }) {
    // The timer counts from when the session started, so resuming or refreshing continues it
    const [now, setNow] = useState(() => Date.now());
    const [isStopping, setIsStopping] = useState(false);
    const [error, setError] = useState('');
    const isCompletedRef = useRef(false);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval)
    }, [])

    const elapsed = Math.max(0, Math.floor((now - new Date(startedAt ?? now).getTime()) / 1000));

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

            // Generate feedback now if possible. If the AI is busy, the feedback page
            // offers a "Generate feedback" button, so a failure here isn't a dead end.
            try {
                const feedbackResponse = await fetch(`/api/attempts/${attemptId}/feedback`, { method: "POST" });
                if (!feedbackResponse.ok) console.error("Feedback generation failed:", await feedbackResponse.text());
            } catch (feedbackError) {
                console.error("Feedback generation failed:", feedbackError);
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
                        {/* Server and browser clocks differ by a moment; the next tick corrects it */}
                        <span suppressHydrationWarning>{formatElapsed(elapsed)}</span>
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
                        {isStopping ? 'Ending and scoring...' : 'Stop session'}
                    </button>
                </div>
            </div>
            {error && <p className='text-right text-sm text-red-600'>{error}</p>}
        </div>
    )
}
