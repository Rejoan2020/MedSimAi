'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteAnnouncement, saveAnnouncement } from '@/app/actions/adminContent'

const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue'
const emptyForm = { title: '', description: '', type: 'Update', isPublished: true }

export default function AnnouncementManager({ announcements }) {
    const router = useRouter()
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [isBusy, setIsBusy] = useState(false)
    const [error, setError] = useState('')

    function startEdit(a) {
        setEditingId(a._id)
        setForm({ title: a.title, description: a.description, type: a.type, isPublished: a.isPublished })
        setError('')
    }

    function reset() {
        setEditingId(null)
        setForm(emptyForm)
    }

    async function run(action, after) {
        setIsBusy(true)
        setError('')
        try {
            const result = await action()
            if (!result.success) throw new Error(result.message)
            after?.()
            router.refresh()
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsBusy(false)
        }
    }

    const set = (field) => (e) => setForm((prev) => ({
        ...prev,
        [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

    return (
        <div className='flex flex-col gap-6'>
            <form
                onSubmit={(e) => { e.preventDefault(); run(() => saveAnnouncement(editingId, form), reset) }}
                className='flex flex-col gap-4 rounded-xl border border-[#F0F4FE] p-4'
            >
                <div className='font-medium text-[#2536A8]'>{editingId ? 'Edit announcement' : 'New announcement'}</div>
                <div className='grid gap-4 md:grid-cols-3'>
                    <input value={form.title} onChange={set('title')} placeholder='Title' required className={`${inputClass} md:col-span-2`} />
                    <input value={form.type} onChange={set('type')} placeholder='Label, e.g. New Cases' className={inputClass} />
                </div>
                <textarea value={form.description} onChange={set('description')} placeholder='Message' rows={3} required className={inputClass} />
                <div className='flex flex-wrap items-center gap-4'>
                    <label className='flex items-center gap-2 text-sm'>
                        <input type='checkbox' checked={form.isPublished} onChange={set('isPublished')} className='h-4 w-4' />
                        Visible to students
                    </label>
                    {error && <p className='text-sm text-red-600'>{error}</p>}
                    <div className='ml-auto flex gap-2'>
                        {editingId && <button type='button' onClick={reset} className='rounded-lg border border-gray-300 px-4 py-2 text-sm'>Cancel</button>}
                        <button type='submit' disabled={isBusy} className='rounded-lg bg-light-blue px-4 py-2 text-sm text-white disabled:opacity-50'>
                            {isBusy ? 'Saving...' : editingId ? 'Save changes' : 'Publish announcement'}
                        </button>
                    </div>
                </div>
            </form>

            {announcements.length === 0
                ? <div className='text-Secondary-Text'>No announcements yet.</div>
                : <div className='flex flex-col gap-3'>
                    {announcements.map((a) =>
                        <div key={a._id} className='flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#F0F4FE] p-4'>
                            <div className='flex-1'>
                                <div className='flex items-center gap-2'>
                                    <span className='rounded-full bg-light-blue/10 px-3 py-1 text-xs text-light-blue'>{a.type}</span>
                                    {!a.isPublished && <span className='rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600'>Hidden</span>}
                                    <span className='text-xs text-gray-500'>{new Date(a.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <div className='mt-2 font-semibold'>{a.title}</div>
                                <div className='text-sm text-gray-600'>{a.description}</div>
                            </div>
                            <div className='flex gap-3 text-sm'>
                                <button onClick={() => startEdit(a)} className='text-light-blue hover:underline cursor-pointer'>Edit</button>
                                <button
                                    onClick={() => confirm(`Delete "${a.title}"?`) && run(() => deleteAnnouncement(a._id), () => editingId === a._id && reset())}
                                    disabled={isBusy}
                                    className='text-red-600 hover:underline cursor-pointer disabled:opacity-50'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    )
}
