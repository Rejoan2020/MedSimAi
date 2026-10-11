'use client'

import { useActionState, useState } from 'react'
import { GraduationCap, ShieldCheck } from 'lucide-react'
import { demoSignin } from '@/app/actions/auth'

const OPTIONS = [
    { role: 'student', label: 'Student demo', hint: 'Run cases and see AI feedback', icon: GraduationCap },
    { role: 'admin', label: 'Admin demo', hint: 'Browse the CMS (read-only)', icon: ShieldCheck },
]

// One-click sign-in to the shared demo accounts, for visitors exploring the project
export default function DemoAccess({ roles = ['student', 'admin'] }) {
    const [state, formAction, pending] = useActionState(demoSignin, null)
    const [chosen, setChosen] = useState(null)

    return (
        <div className='flex w-full flex-col gap-3'>
            <div className='flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-Secondary-Text'>
                <span className='h-px flex-1 bg-brand-secondary' />
                Or explore the demo
                <span className='h-px flex-1 bg-brand-secondary' />
            </div>
            <form action={formAction} className='grid gap-2'>
                {OPTIONS.filter((o) => roles.includes(o.role)).map(({ role, label, hint, icon: Icon }) =>
                    <button
                        key={role}
                        type='submit'
                        name='role'
                        value={role}
                        disabled={pending}
                        onClick={() => setChosen(role)}
                        className='flex items-center gap-3 rounded-2xl border border-brand-secondary bg-white px-4 py-3 text-left hover:border-light-blue hover:bg-brand-primary/40 cursor-pointer disabled:cursor-wait disabled:opacity-60'
                    >
                        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-light-blue'>
                            <Icon className='h-4 w-4' aria-hidden />
                        </span>
                        <span className='min-w-0'>
                            <span className='block text-sm font-semibold text-deep-blue'>{pending && chosen === role ? 'Signing in...' : label}</span>
                            <span className='block text-xs text-Secondary-Text'>{hint}</span>
                        </span>
                    </button>)}
            </form>
            {state?.error && <p className='text-sm text-red-600'>{state.error}</p>}
        </div>
    )
}
