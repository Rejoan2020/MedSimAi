import { SkeletonCard, SkeletonHeader, SkeletonPage, SkeletonRow } from '@/app/components/Skeleton'

// Fallback for admin pages: header, then a card of list rows
export default function Loading() {
    return (
        <SkeletonPage>
            <SkeletonHeader withIcon={false} withAction />
            <SkeletonCard className='flex flex-col gap-3'>
                {[0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
            </SkeletonCard>
        </SkeletonPage>
    )
}
