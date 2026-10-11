'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'

// Shown when a completed session has no feedback yet (e.g. the AI was busy when the session ended)
export default function GenerateFeedback({ attemptId }) {
    const router = useRouter()
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState('')

    async function generate() {
        setIsGenerating(true)
        setError('')
        try {
            const response = await fetch(`/api/attempts/${attemptId}/feedback`, { method: 'POST' })
            const data = await response.json()
            if (!response.ok || !data.success) throw new Error(data.message)
            router.refresh()
        } catch (err) {
            setError(err.message || "Feedback couldn't be generated. Please try again.")
            setIsGenerating(false)
        }
    }

    return (
        <div className='flex flex-col items-start gap-3 rounded-2xl border border-brand-secondary bg-white p-6'>
            <div>
                <h2 className='font-semibold'>Your feedback isn&apos;t ready yet</h2>
                <p className='mt-1 text-sm text-Secondary-Text'>
                    The AI evaluator reviews your whole consultation. This usually takes 10 to 30 seconds.
                </p>
            </div>
            <button
                type='button'
                onClick={generate}
                disabled={isGenerating}
                className='inline-flex items-center gap-2 rounded-full bg-light-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 cursor-pointer disabled:cursor-wait disabled:opacity-60'
            >
                <Sparkles className='h-4 w-4' />
                {isGenerating ? 'Generating feedback...' : 'Generate feedback'}
            </button>
            {error && <p className='text-sm text-red-600'>{error}</p>}
        </div>
    )
}
