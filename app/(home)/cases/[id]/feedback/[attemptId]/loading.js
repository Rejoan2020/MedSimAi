import { Bone, SkeletonCard, SkeletonPage, SkeletonText } from '@/app/components/Skeleton'

// Mirrors the feedback page: title, tabs, overall score, then category cards
export default function Loading() {
    return (
        <SkeletonPage label='Loading feedback'>
            <div className='flex flex-col gap-2'>
                <Bone className='h-4 w-28' />
                <Bone className='h-3 w-16' />
                <Bone className='h-8 w-56' />
                <Bone className='h-4 w-36' />
            </div>
            <div className='grid grid-cols-2 gap-1 rounded-xl border border-brand-secondary bg-white p-1 sm:grid-cols-4'>
                {[0, 1, 2, 3].map((i) => <Bone key={i} className='h-9' />)}
            </div>
            <SkeletonCard className='flex flex-col gap-3'>
                <Bone className='h-4 w-24' />
                <Bone className='h-9 w-24' />
                <SkeletonText lines={2} />
            </SkeletonCard>
            {[0, 1, 2].map((i) =>
                <div key={i} className='overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
                    <div className='flex items-center justify-between border-b border-brand-secondary bg-brand-primary/50 px-4 py-3 sm:px-6'>
                        <Bone className='h-5 w-36 bg-white' />
                        <Bone className='h-8 w-28 rounded-full bg-white' />
                    </div>
                    <div className='flex flex-col items-center gap-5 p-4 sm:flex-row sm:p-6'>
                        <Bone className='h-28 w-28 shrink-0 rounded-full sm:h-32 sm:w-32' />
                        <div className='flex w-full flex-col gap-3'>
                            <Bone className='h-5 w-28' />
                            <SkeletonText lines={2} />
                        </div>
                    </div>
                </div>)}
        </SkeletonPage>
    )
}
