import React from 'react'
import { MessageSquareText, Sparkles, Stethoscope } from 'lucide-react'

const FEATURES = [
    { icon: Stethoscope, title: 'Realistic cases', text: 'Patients with full histories across specialties' },
    { icon: MessageSquareText, title: 'AI patients', text: 'Take a history in natural conversation' },
    { icon: Sparkles, title: 'Instant feedback', text: 'Scored on consultation, reasoning and communication' },
]

// Gradient side panel for the sign-in and sign-up pages (large screens only)
export default function AuthHero({ title = 'Compassionate care starts with confident practice.' }) {
    return (
        <div className='hero-gradient relative hidden h-full min-h-dvh overflow-hidden lg:flex'>
            <div aria-hidden className='pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-light-blue/25 blur-3xl' />
            <div aria-hidden className='pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#0F2640]/40 blur-3xl' />
            <div className='relative flex w-full flex-col justify-between p-12 text-white'>
                <div className='text-sm font-medium tracking-wide text-white/80'>MedSimAI · Clinical simulation</div>
                <div className='max-w-lg'>
                    <h2 className='text-4xl font-bold leading-tight text-white xl:text-5xl'>{title}</h2>
                    <p className='mt-4 text-lg text-white/85'>
                        Practise patient consultations with AI, then learn exactly what to improve.
                    </p>
                </div>
                <div className='glass grid grid-cols-3 divide-x divide-white/25 rounded-2xl'>
                    {FEATURES.map(({ icon: Icon, title: featureTitle, text }) =>
                        <div key={featureTitle} className='flex flex-col gap-2 p-5'>
                            <Icon className='h-6 w-6 text-white' strokeWidth={1.75} />
                            <div className='font-semibold text-white'>{featureTitle}</div>
                            <div className='text-xs leading-relaxed text-white/80'>{text}</div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}
