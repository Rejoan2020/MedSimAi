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
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
            <div className='border-b border-gray-200 pb-3 font-semibold text-deep-blue'>
                Consultation Plan
            </div>
            <textarea
                value={plan}
                onChange={(e) => { setPlan(e.target.value); setStatus('') }}
                maxLength={10000}
                rows={8}
                className='w-full rounded-lg border border-gray-200 p-4 outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20'
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
