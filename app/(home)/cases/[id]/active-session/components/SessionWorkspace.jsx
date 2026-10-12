'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Header from './Header'
import ChatBox from './ChatBox'
import Note from './Note'

export default function SessionWorkspace({ slug, title, attemptId, startedAt, initialMessages, initialNotes, plan = '' }) {
    const [notesOpen, setNotesOpen] = useState(false)
    const [panelTab, setPanelTab] = useState('notes')

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-3 p-3 sm:p-4 lg:p-6">
            <Header slug={slug} title={title} attemptId={attemptId} startedAt={startedAt} onToggleNotes={() => setNotesOpen((v) => !v)} />

            <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 gap-4">
                <section aria-label="Consultation" className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-brand-secondary bg-white">
                    <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-light-blue font-semibold text-white">
                            AI
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">Simulated Patient</h2>
                            <div className="flex items-center gap-2 text-xs text-Secondary-Text">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Patient is ready
                            </div>
                        </div>
                    </div>

                    <ChatBox attemptId={attemptId} initialMessages={initialMessages} />
                </section>

                {notesOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setNotesOpen(false)} />}

                <aside
                    aria-label="Consultation notes"
                    className={`${notesOpen ? 'flex' : 'hidden'} fixed inset-x-0 bottom-0 z-50 h-[75dvh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl lg:static lg:z-auto lg:flex lg:h-auto lg:w-80 lg:shrink-0 lg:rounded-xl lg:border lg:border-gray-200 lg:shadow-none`}
                >
                    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5">
                        <div role="tablist" aria-label="Notes and plan" className="grid flex-1 grid-cols-2 gap-1 rounded-full bg-brand-primary p-1 text-sm">
                            {[['notes', 'Notes'], ['plan', 'Your plan']].map(([value, label]) =>
                                <button
                                    key={value}
                                    type="button"
                                    role="tab"
                                    aria-selected={panelTab === value}
                                    onClick={() => setPanelTab(value)}
                                    className={`rounded-full py-1.5 font-medium cursor-pointer ${panelTab === value ? 'bg-white text-light-blue shadow-sm' : 'text-deep-blue'}`}
                                >
                                    {label}
                                </button>)}
                        </div>
                        <button
                            type="button"
                            onClick={() => setNotesOpen(false)}
                            aria-label="Close notes"
                            className="rounded-lg p-1 text-Secondary-Text hover:bg-gray-100 cursor-pointer lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className={`min-h-0 flex-1 overflow-y-auto ${panelTab === 'notes' ? '' : 'hidden'}`}>
                        <Note attemptId={attemptId} initialNotes={initialNotes} />
                    </div>
                    {panelTab === 'plan' &&
                        <div className="min-h-0 flex-1 overflow-y-auto p-4">
                            {plan
                                ? <p className="whitespace-pre-wrap text-sm leading-6 text-deep-blue">{plan}</p>
                                : <p className="text-sm text-Secondary-Text">
                                    You didn&apos;t write a consultation plan for this case. Add one on the case page before your next attempt.
                                </p>}
                        </div>}
                </aside>
            </div>
        </div>
    )
}
