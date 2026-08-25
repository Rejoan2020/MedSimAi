import React from 'react'
import { Bell, CalendarDays, ChevronRight } from 'lucide-react'

const announcements = [
    {
        id: 1,
        title: 'New Clinical Cases Available',
        description:
            'Three new clinical simulation cases have been added to the Respiratory and Cardiology modules.',
        date: 'August 24, 2026',
        type: 'New Cases',
    },
    {
        id: 2,
        title: 'System Maintenance',
        description:
            'MedSimAI will undergo scheduled maintenance on August 28 from 2:00 AM to 4:00 AM.',
        date: 'August 22, 2026',
        type: 'Maintenance',
    },
    {
        id: 3,
        title: 'Updated Simulation Feedback',
        description:
            'We have improved the AI feedback system to provide more detailed recommendations after each simulation.',
        date: 'August 20, 2026',
        type: 'Update',
    },
    {
        id: 4,
        title: 'New Learning Path Available',
        description:
            'A new Emergency Medicine learning path is now available for students.',
        date: 'August 18, 2026',
        type: 'Learning Path',
    },
]

export default function Announcements() {
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

                {announcements.map((announcement) => (
                    <div
                        key={announcement.id}
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
                                    {announcement.date}
                                </div>

                            </div> 

                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}