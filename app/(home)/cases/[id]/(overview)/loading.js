import { Bone, SkeletonCard, SkeletonPage, SkeletonText } from '@/app/components/Skeleton'

// Mirrors the case page: case header with start button, case document, and preparation
export default function Loading() {
    return (
        <SkeletonPage label='Loading case'>
            <Bone className='h-4 w-24' />
            <SkeletonCard className='flex flex-col gap-5 sm:flex-row sm:items-center'>
                <Bone className='h-28 w-28 shrink-0 rounded-2xl' />
                <div className='flex flex-1 flex-col gap-3'>
                    <Bone className='h-3 w-24' />
                    <Bone className='h-8 w-2/3' />
                    <SkeletonText lines={2} />
                    <div className='flex gap-2'>
                        <Bone className='h-6 w-24 rounded-full' />
                        <Bone className='h-6 w-24 rounded-full' />
                    </div>
                </div>
                <Bone className='h-12 w-full shrink-0 rounded-full sm:w-44' />
            </SkeletonCard>
            <div className='grid gap-6 lg:grid-cols-5'>
                <SkeletonCard className='flex h-[70vh] min-h-96 flex-col gap-4 lg:col-span-3'>
                    <Bone className='h-5 w-36' />
                    <Bone className='flex-1 rounded-xl' />
                </SkeletonCard>
                <SkeletonCard className='flex flex-col gap-5 lg:col-span-2'>
                    <Bone className='h-5 w-44' />
                    {[0, 1, 2, 3].map((i) =>
                        <div key={i} className='flex flex-col gap-2'>
                            <Bone className='h-4 w-36' />
                            <div className='flex gap-2'>
                                {[0, 1, 2, 3, 4].map((j) => <Bone key={j} className='h-10 flex-1 rounded-md' />)}
                            </div>
                        </div>)}
                </SkeletonCard>
            </div>
        </SkeletonPage>
    )
}
