import { Bone, SkeletonCard, SkeletonHeader, SkeletonPage, SkeletonText } from '@/app/components/Skeleton'

export default function Loading() {
    return (
        <SkeletonPage label='Loading cases'>
            <SkeletonHeader />
            <SkeletonCard className='flex flex-col gap-3 !p-4'>
                <Bone className='h-11 w-full rounded-lg' />
                <div className='hidden gap-3 sm:grid sm:grid-cols-3'>
                    {[0, 1, 2].map((i) => <Bone key={i} className='h-11 rounded-lg' />)}
                </div>
            </SkeletonCard>
            <div className='grid gap-6 lg:grid-cols-2'>
                {[0, 1, 2, 3].map((i) =>
                    <div key={i} className='overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
                        <div className='flex flex-col gap-4 p-4 sm:flex-row sm:p-5'>
                            <Bone className='h-44 shrink-0 rounded-xl sm:h-32 sm:w-32' />
                            <div className='flex flex-1 flex-col gap-3'>
                                <Bone className='h-3 w-24' />
                                <Bone className='h-6 w-3/4' />
                                <SkeletonText lines={2} />
                                <div className='flex gap-2'>
                                    <Bone className='h-6 w-24 rounded-full' />
                                    <Bone className='h-6 w-24 rounded-full' />
                                </div>
                            </div>
                        </div>
                        <div className='border-t border-brand-secondary p-4 sm:px-5'>
                            <Bone className='ml-auto h-10 w-full rounded-full sm:w-32' />
                        </div>
                    </div>)}
            </div>
        </SkeletonPage>
    )
}
