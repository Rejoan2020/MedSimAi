import React from 'react'
import { Bell, CalendarDays, ChevronRight } from 'lucide-react'



export default function Announcements({ announcements }) {
    return (
        <div className="w-full px-8 py-8 text-black">

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-light-blue/10">
                        <Bell className="h-5 w-5 text-light-blue" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold">
                            Announcements
                        </h1>

                        <p className="mt-1 text-sm text-Secondary-Text">
                            Stay updated with the latest news and updates from MedSimAI.
                        </p>
                    </div>
                </div>
            </div>


            {/* Announcement list */}
            <div className="flex max-w-4xl flex-col gap-4">

                {announcements.length === 0 && (
                    <p className="text-sm text-Secondary-Text">No announcements right now.</p>
                )}

                {announcements.map((announcement) => (
                    <div
                        key={announcement._id}
                        className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-light-blue/40 hover:shadow-sm"
                    >

                        <div className="flex items-start justify-between gap-6">

                            <div className="flex-1"> 
                                <div className="mb-3">
                                    <span className="rounded-full bg-light-blue/10 px-3 py-1 text-xs font-medium text-light-blue">
                                        {announcement.type}
                                    </span>
                                </div>
 
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {announcement.title}
                                </h2>

                                {/* Description */}
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    {announcement.description}
                                </p>

                                {/* Date */}
                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                                    <CalendarDays className="h-4 w-4" />
                                    {new Date(announcement.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>

                            </div> 

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}