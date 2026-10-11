import React from 'react'
import { Bell, CalendarDays } from 'lucide-react'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'

export default function Announcements({ announcements }) {
    return (
        <PageContainer>
            <PageHeader
                eyebrow='Stay informed'
                title='Announcements'
                description='Stay updated with the latest news and updates from MedSimAI.'
                icon={Bell}
            />

            <div className="flex max-w-4xl flex-col gap-4">
                {announcements.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-Secondary-Text">
                        No announcements right now.
                    </div>
                )}

                {announcements.map((announcement) => (
                    <article
                        key={announcement._id}
                        className="rounded-2xl border border-brand-secondary bg-white p-4 transition hover:border-light-blue/40 hover:shadow-sm sm:p-6"
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-light-blue/10 px-3 py-1 text-xs font-medium text-light-blue">
                                {announcement.type}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                <CalendarDays className="h-4 w-4" />
                                {new Date(announcement.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        <h2 className="mt-3 text-lg font-semibold text-gray-900">
                            {announcement.title}
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {announcement.description}
                        </p>
                    </article>
                ))}
            </div>
        </PageContainer>
    )
}
