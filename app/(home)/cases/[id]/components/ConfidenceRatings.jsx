'use client'

import { useState } from 'react'
import Options from '@/components/Options'
import { saveConfidence } from '@/app/actions/casePrep'
import { CONFIDENCE_SKILLS } from '@/utils/confidenceSkills'

export default function ConfidenceRatings({ caseId, initialRatings = {} }) {
    const [ratings, setRatings] = useState(initialRatings)
    const [savingSkill, setSavingSkill] = useState(null)
    const [error, setError] = useState('')

    // Each click saves straight away; roll back if the save fails
    async function rate(skill, rating) {
        const previous = ratings[skill]
        setRatings((prev) => ({ ...prev, [skill]: rating }))
        setSavingSkill(skill)
        setError('')

        try {
            const result = await saveConfidence(caseId, skill, rating)
            if (!result.success) throw new Error(result.message)
        } catch (err) {
            setRatings((prev) => ({ ...prev, [skill]: previous }))
            setError(err.message || "Couldn't save your rating. Please try again.")
        } finally {
            setSavingSkill(null)
        }
    }

    return (
        <div className='rounded-2xl border border-brand-secondary bg-white p-4 sm:p-6'>
            <div className='mb-2 border-b border-gray-200 pb-3 font-semibold text-deep-blue'>
                How confident are you?
            </div>
            {CONFIDENCE_SKILLS.map((skill) =>
                <div key={skill} className='text-deep-blue text-sm'>
                    <div className='pb-2 pt-4'>{skill}</div>
                    <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map((number) =>
                            <Options
                                key={number}
                                number={number}
                                selected={ratings[skill] === number}
                                disabled={savingSkill === skill}
                                onClick={() => rate(skill, number)}
                            />)}
                    </div>
                    <div className='mt-1 flex justify-between text-xs text-gray-400'>
                        <div>Not confident</div>
                        <div>Very confident</div>
                    </div>
                </div>
            )}
            {error && <p className='pt-4 text-sm text-red-600'>{error}</p>}
        </div>
    )
}
