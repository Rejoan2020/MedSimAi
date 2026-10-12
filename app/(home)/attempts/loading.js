import { SkeletonHeader, SkeletonPage, SkeletonRow } from '@/app/components/Skeleton'

export default function Loading() {
    return (
        <SkeletonPage label='Loading your attempts'>
            <SkeletonHeader withAction />
            <div className='flex flex-col gap-3'>
                {[0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
            </div>
        </SkeletonPage>
    )
}
