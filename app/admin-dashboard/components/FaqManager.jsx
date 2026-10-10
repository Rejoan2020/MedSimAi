'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { deleteFaq, moveFaq, saveFaq } from '@/app/actions/adminContent'

const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue'
const emptyForm = { question: '', answer: '' }

export default function FaqManager({ faqs }) {
    const router = useRouter()
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [isBusy, setIsBusy] = useState(false)
    const [error, setError] = useState('')

    function startEdit(faq) {
        setEditingId(faq._id)
        setForm({ question: faq.question, answer: faq.answer })
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

    return (
        <div className='flex flex-col gap-6'>
            <form
                onSubmit={(e) => { e.preventDefault(); run(() => saveFaq(editingId, form), reset) }}
                className='flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-6'
            >
                <div className='font-medium text-[#2536A8]'>{editingId ? 'Edit question' : 'New question'}</div>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder='Question' required className={inputClass} />
                <textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder='Answer' rows={3} required className={inputClass} />
                <div className='flex flex-wrap items-center gap-4'>
                    {error && <p className='text-sm text-red-600'>{error}</p>}
                    <div className='ml-auto flex gap-2'>
                        {editingId && <button type='button' onClick={reset} className='rounded-lg border border-gray-300 px-4 py-2 text-sm'>Cancel</button>}
                        <button type='submit' disabled={isBusy} className='rounded-lg bg-light-blue px-4 py-2 text-sm text-white disabled:opacity-50'>
                            {isBusy ? 'Saving...' : editingId ? 'Save changes' : 'Add question'}
                        </button>
                    </div>
                </div>
            </form>

            {faqs.length === 0
                ? <div className='text-Secondary-Text'>No questions yet.</div>
                : <div className='flex flex-col gap-3'>
                    {faqs.map((faq, index) =>
                        <div key={faq._id} className='flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4'>
                            <div className='flex flex-col gap-1'>
                                <button
                                    onClick={() => run(() => moveFaq(faq._id, -1))}
                                    disabled={isBusy || index === 0}
                                    aria-label='Move up'
                                    className='rounded p-1 hover:bg-gray-100 cursor-pointer disabled:opacity-30'
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => run(() => moveFaq(faq._id, 1))}
                                    disabled={isBusy || index === faqs.length - 1}
                                    aria-label='Move down'
                                    className='rounded p-1 hover:bg-gray-100 cursor-pointer disabled:opacity-30'
                                >
                                    <ArrowDown size={16} />
                                </button>
                            </div>
                            <div className='flex-1'>
                                <div className='font-semibold'>{faq.question}</div>
                                <div className='text-sm text-gray-600'>{faq.answer}</div>
                            </div>
                            <div className='flex gap-3 text-sm'>
                                <button onClick={() => startEdit(faq)} className='text-light-blue hover:underline cursor-pointer'>Edit</button>
                                <button
                                    onClick={() => confirm('Delete this question?') && run(() => deleteFaq(faq._id), () => editingId === faq._id && reset())}
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
