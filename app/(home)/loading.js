import { SkeletonCard, SkeletonHeader, SkeletonPage, SkeletonText, Bone } from '@/app/components/Skeleton'

// Fallback for student pages without their own loading screen (Announcements, Help & FAQ)
export default function Loading() {
    return (
        <SkeletonPage>
            <SkeletonHeader />
            <div className='flex max-w-4xl flex-col gap-4'>
                {[0, 1, 2].map((i) =>
                    <SkeletonCard key={i} className='flex flex-col gap-3'>
                        <Bone className='h-5 w-24 rounded-full' />
                        <Bone className='h-6 w-2/3' />
                        <SkeletonText lines={2} />
                    </SkeletonCard>)}
            </div>
        </SkeletonPage>
    )
}
