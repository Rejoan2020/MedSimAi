'use client'

import { useState } from 'react'
import { saveConsultationPlan } from '@/app/actions/casePrep'

export default function ConsultationPlan({ caseId, initialPlan = '' }) {
    const [plan, setPlan] = useState(initialPlan)
    const [savedPlan, setSavedPlan] = useState(initialPlan)
    const [isSaving, setIsSaving] = useState(false)
    const [status, setStatus] = useState('')

    const hasChanges = plan !== savedPlan

    async function handleSave() {
        setIsSaving(true)
        setStatus('')
        try {
            const result = await saveConsultationPlan(caseId, plan)
            if (!result.success) throw new Error(result.message)
            setSavedPlan(plan)
            setStatus('Saved')
        } catch (err) {
            setStatus(err.message || "Couldn't save your plan. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="sm:w-100 m-6 border border-gray-200 p-4 rounded-lg flex flex-col gap-4">
            <div className='text-blue-800 border-b border-gray-200 pb-4'>
                Consultation Plan
            </div>
            <textarea
                value={plan}
                onChange={(e) => { setPlan(e.target.value); setStatus('') }}
                maxLength={10000}
                className='border sm:w-80 sm:h-80 max-sm:w-60 max-sm:h-60 border-gray-200 rounded-lg p-4 outline-none'
                placeholder='Add your consultation plan here...'
            />
            {status && <p className={`text-sm ${status === 'Saved' ? 'text-green-600' : 'text-red-600'}`}>{status}</p>}
            <button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className='border border-gray-200 p-2 rounded-lg w-full bg-light-blue text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
            >
                {isSaving ? 'Saving...' : 'Save'}
            </button>
        </div>
    )
}
