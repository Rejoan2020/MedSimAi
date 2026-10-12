import { Bone, SkeletonPage, SkeletonSection, SkeletonText } from '@/app/components/Skeleton'

export default function Loading() {
    return (
        <SkeletonPage label='Loading your dashboard'>
            <div className='overflow-hidden rounded-3xl border border-brand-secondary bg-white'>
                <div className='grid items-center gap-6 px-6 pt-8 sm:px-10 sm:pt-10 lg:grid-cols-[1.15fr_1fr]'>
                    <div className='flex flex-col gap-4 pb-4 lg:pb-24'>
                        <Bone className='h-3 w-40' />
                        <Bone className='h-10 w-full max-w-md' />
                        <Bone className='h-10 w-4/5 max-w-sm' />
                        <div className='mt-2 max-w-md'><SkeletonText lines={2} /></div>
                        <div className='mt-4 flex gap-4'>
                            <Bone className='h-12 w-40 rounded-full' />
                            <Bone className='h-12 w-32 rounded-full' />
                        </div>
                    </div>
                    <Bone className='mx-auto h-72 w-full max-w-md rounded-[45%] sm:h-80 lg:h-[26rem]' />
                </div>
                <div className='relative mx-4 -mt-6 mb-4 grid grid-cols-3 rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgb(39_71_96_/_0.25)] ring-1 ring-brand-secondary sm:mx-10 sm:mb-8 lg:-mt-20'>
                    {[0, 1, 2].map((i) =>
                        <div key={i} className='flex flex-col items-center gap-2 px-2 py-6'>
                            <Bone className='h-8 w-14' />
                            <Bone className='h-3 w-20' />
                        </div>)}
                </div>
            </div>

            <div className='grid items-start gap-6 xl:grid-cols-2'>
                <SkeletonSection rows={3} />
                <SkeletonSection rows={3} />
            </div>
        </SkeletonPage>
    )
}
