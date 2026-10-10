'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Header from './Header'
import ChatBox from './ChatBox'
import Note from './Note'

// Chat plus notes. Notes are a side panel on large screens and a slide-up panel below,
// using a single Note instance so unsaved text survives opening and closing it.
export default function SessionWorkspace({ slug, title, attemptId, initialMessages, initialNotes }) {
    const [notesOpen, setNotesOpen] = useState(false)

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-3 p-3 sm:p-4 lg:p-6">
            <Header slug={slug} title={title} attemptId={attemptId} onToggleNotes={() => setNotesOpen((v) => !v)} />

            <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 gap-4">
                <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
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
                </main>

                {notesOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setNotesOpen(false)} />}

                <aside
                    aria-label="Consultation notes"
                    className={`${notesOpen ? 'flex' : 'hidden'} fixed inset-x-0 bottom-0 z-50 h-[75dvh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl lg:static lg:z-auto lg:flex lg:h-auto lg:w-80 lg:shrink-0 lg:rounded-xl lg:border lg:border-gray-200 lg:shadow-none`}
                >
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
                        <h2 className="font-semibold">Consultation Notes</h2>
                        <button
                            type="button"
                            onClick={() => setNotesOpen(false)}
                            aria-label="Close notes"
                            className="rounded-lg p-1 text-Secondary-Text hover:bg-gray-100 cursor-pointer lg:hidden"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <Note attemptId={attemptId} initialNotes={initialNotes} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
