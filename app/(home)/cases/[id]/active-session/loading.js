import { Bone } from '@/app/components/Skeleton'

// Mirrors the live session: header with timer and stop button, chat, and notes panel
export default function Loading() {
    const bubbles = [
        { side: 'end', width: 'w-2/3 sm:w-1/2' },
        { side: 'start', width: 'w-3/4 sm:w-3/5' },
        { side: 'end', width: 'w-1/2 sm:w-2/5' },
        { side: 'start', width: 'w-2/3 sm:w-1/2' },
    ]

    return (
        <div role='status' aria-live='polite' className='flex h-full min-h-0 w-full flex-col gap-3 p-3 sm:p-4 lg:p-6'>
            <span className='sr-only'>Loading session…</span>
            <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-3'>
                <Bone className='h-6 w-48' />
                <div className='flex gap-2'>
                    <Bone className='h-9 w-20' />
                    <Bone className='h-9 w-32' />
                </div>
            </div>

            <div className='mx-auto flex min-h-0 w-full max-w-6xl flex-1 gap-4'>
                <div className='flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
                    <div className='flex items-center gap-3 border-b border-brand-secondary px-4 py-3'>
                        <Bone className='h-10 w-10 rounded-full' />
                        <div className='flex flex-col gap-2'>
                            <Bone className='h-4 w-36' />
                            <Bone className='h-3 w-24' />
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col gap-5 p-4 sm:p-6'>
                        {bubbles.map((b, i) =>
                            <div key={i} className={`flex ${b.side === 'end' ? 'justify-end' : 'justify-start'}`}>
                                <Bone className={`h-14 rounded-2xl ${b.width}`} />
                            </div>)}
                    </div>
                    <div className='border-t border-brand-secondary p-3 sm:p-4'>
                        <div className='flex gap-2'>
                            <Bone className='h-12 flex-1 rounded-xl' />
                            <Bone className='h-12 w-12 rounded-xl' />
                        </div>
                    </div>
                </div>
                <div className='hidden w-80 shrink-0 flex-col gap-3 rounded-2xl border border-brand-secondary bg-white p-4 lg:flex'>
                    <Bone className='h-9 w-full rounded-full' />
                    <Bone className='flex-1 rounded-lg' />
                </div>
            </div>
        </div>
    )
}
