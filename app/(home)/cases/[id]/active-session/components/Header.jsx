'use client'
import { ArrowLeft, Clock, StopCircle } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

export default function Header({ slug, title, attemptId }) {
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
        <div className='flex justify-between max-w-350 w-full gap-4'>
            <Link href={`/cases/${slug}`} className='flex gap-2 min-w-54 p-2'>
                <ArrowLeft className='w-6 h-6' />
                <div>{title}</div>
            </Link>

            <div className='sm:flex sm:min-w-64 gap-4'>
                <div className='flex flex-col gap-1'>
                    <button
                        className='min-w-36 flex justify-between hover:bg-red-500 cursor-pointer bg-red-600 text-white gap-2 border rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-60'
                        onClick={handleSession}
                        disabled={isStopping}
                    >
                        <StopCircle />
                        <div>{isStopping ? 'Ending...' : 'Stop Session'}</div>
                    </button>
                    {error && <p className='text-sm text-red-600'>{error}</p>}
                </div>

                <div className='flex sm:justify-between gap-2 p-2'>
                    <Clock />
                    <div>
                        {String(minutes).padStart(2, '0')}:
                        {String(remainingSeconds).padStart(2, '0')}
                    </div>
                </div>
            </div>

        </div>
    )
}
