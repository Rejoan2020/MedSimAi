'use client'
import { ArrowLeft, Clock, StopCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Header({ id, attemptId, caseId }) {
    const [seconds, setSeconds] = useState(0);
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
        try {
            const completeResponse = await fetch(`/api/attempts/${attemptId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: 'completed' })
            });
            const completeData = await completeResponse.json();

            console.log("completeData : ",completeData);

            if (!completeResponse.ok || !completeData.success) {
                throw new Error(
                    completeData.message || "Failed to complete attempt"
                );
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

            if (feedbackData.success) {
                router.push(`/cases/${caseId}/feedback/${attemptId}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='flex justify-between max-w-350 w-full gap-4'>
            <div className='flex justify-between gap-2 cursor-pointer min-w-54 p-2'>
                <ArrowLeft className='w-6 h-6' />
                <div>Nutrition Support (SS1)</div>
            </div>

            <div className='sm:flex sm:min-w-64 gap-4'>
                <button
                    className='min-w-36 flex justify-between hover:bg-red-500 cursor-pointer bg-red-600 text-white gap-2 border rounded-lg p-2'
                    // href={`/cases/${id}/feedback`}
                    onClick={handleSession}
                >
                    <StopCircle />
                    <div>Stop Session</div>
                </button>

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
