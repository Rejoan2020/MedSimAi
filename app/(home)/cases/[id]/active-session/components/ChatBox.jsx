'use client'

import { useState } from 'react'
import { Send, Mic } from 'lucide-react'

export default function ChatBox() {

    const [message, setMessage] = useState('')

    const [messages, setMessages] = useState([
        {
            role: 'patient',
            content:
                "Hello doctor. I've been feeling short of breath for the past three days.",
        },
    ])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!message.trim()) return

        const userMessage = message.trim()

        setMessages((prev) => [
            ...prev,
            {
                role: 'student',
                content: userMessage,
            },
        ])

        setMessage('')

        // Later:
        // const response = await fetch('/api/ai/consultation', ...)
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col">

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">

                <div className="mx-auto flex max-w-3xl flex-col gap-5">

                    {messages.map((message, index) => (

                        <div
                            key={index}
                            className={`flex ${
                                message.role === 'student'
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >

                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                    message.role === 'student'
                                        ? 'rounded-br-sm bg-light-blue text-white'
                                        : 'rounded-bl-sm bg-gray-100 text-gray-800'
                                }`}
                            >
                                {message.content}
                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* Input */}
            <div className="shrink-0 border-t border-gray-200 p-4">

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto flex max-w-3xl items-center gap-2"
                >

                    <div className="flex flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-3">

                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask the patient a question..."
                            className="h-12 flex-1 bg-transparent px-2 text-sm outline-none"
                        />

                        <button
                            type="button"
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                        >
                            <Mic size={19} />
                        </button>

                    </div>

                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>

                </form>

                <p className="mt-2 text-center text-xs text-gray-400">
                    Ask questions naturally as you would during a real consultation.
                </p>

            </div>

        </div>
    )
}