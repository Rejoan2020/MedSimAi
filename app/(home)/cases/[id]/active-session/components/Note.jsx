'use client'

import React, { useState } from 'react'
import { saveNotes } from '@/app/actions/casePrep'

export default function Note({ attemptId, initialNotes = '' }) {
    const [notes, setNotes] = useState(initialNotes)
    const [savedNotes, setSavedNotes] = useState(initialNotes)
    const [isSaving, setIsSaving] = useState(false)
    const [status, setStatus] = useState('')

    const hasChanges = notes !== savedNotes

    async function handleSave() {
        setIsSaving(true)
        setStatus('')
        try {
            const result = await saveNotes(attemptId, notes)
            if (!result.success) throw new Error(result.message)
            setSavedNotes(notes)
            setStatus('Saved')
        } catch (err) {
            setStatus(err.message || "Couldn't save your notes. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }

    function handleDiscard() {
        setNotes(savedNotes)
        setStatus('')
    }

    return (
        <div className='flex h-full flex-col gap-2 p-4 text-Secondary-Text'>
            <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setStatus('') }}
                maxLength={10000}
                className='flex-1 rounded-lg border border-gray-200 p-2 outline-none min-h-50'
                placeholder='Take a note...'
            />
            <div className='flex items-center justify-between gap-2'>
                <span className={`text-sm ${status === 'Saved' ? 'text-green-600' : 'text-red-600'}`}>
                    {status || (hasChanges ? <span className='text-Secondary-Text'>Unsaved changes</span> : '')}
                </span>
                <div className='flex gap-2 text-white'>
                    <button
                        onClick={handleDiscard}
                        disabled={!hasChanges || isSaving}
                        className='rounded-lg bg-light-blue p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges || isSaving}
                        className='rounded-lg bg-light-blue p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}
