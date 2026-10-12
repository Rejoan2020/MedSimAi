'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Mic } from 'lucide-react'

export default function ChatBox({ attemptId, initialMessages = [] }) {

    const [message, setMessage] = useState('')

    const [messages, setMessages] = useState(initialMessages)

    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState('')

    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isSending])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!message.trim() || isSending) return;

        const userMessage = message.trim()

        setMessages((prev) => [
            ...prev,
            {
                role: 'student',
                content: userMessage,
            },
        ])

        setMessage('')
        setError('')
        setIsSending(true)

        try {
            const response = await fetch("/api/ai/consultation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    attemptId,
                    message: userMessage,
                }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to get AI response")
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: 'patient',
                    content: data.message,
                },
            ])

        } catch (error) {
            console.error("AI consultation error:", error)

            setMessages((prev) => prev.slice(0, -1))
            setMessage(userMessage)
            setError("The patient couldn't respond. Please try sending your message again.")
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col">

            <div className="flex-1 overflow-y-auto p-3 sm:p-6">

                <div className="mx-auto flex max-w-3xl flex-col gap-5">

                    {messages.map((message, index) => (

                        <div
                            key={index}
                            className={`flex ${message.role === 'student' ? 'justify-end' : 'justify-start'}`}
                        >

                            <div
                                className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] text-sm leading-6 ${message.role === 'student'
                                    ? 'rounded-br-sm bg-light-blue text-white'
                                    : 'rounded-bl-sm bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {message.content}
                            </div>

                        </div>

                    ))}

                    {isSending && (
                        <div className="flex justify-start">
                            <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3 text-sm italic text-gray-500">
                                Patient is typing...
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />

                </div>

            </div>

            <div className="shrink-0 border-t border-gray-200 p-3 sm:p-4">

                {error && (
                    <p className="mx-auto mb-2 max-w-3xl text-sm text-red-600">
                        {error}
                    </p>
                )}

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
                        disabled={!message.trim() || isSending}
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
