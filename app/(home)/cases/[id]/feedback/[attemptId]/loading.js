import { Bone, SkeletonPage, SkeletonText } from '@/app/components/Skeleton'

export default function Loading() {
    return (
        <SkeletonPage label='Loading feedback'>
            <div className='flex flex-col gap-2'>
                <Bone className='h-4 w-28' />
                <Bone className='h-3 w-16' />
                <Bone className='h-8 w-56' />
                <Bone className='h-4 w-36' />
            </div>
            <div className='grid grid-cols-2 gap-1 rounded-2xl border border-brand-secondary bg-white p-1 sm:grid-cols-4'>
                {[0, 1, 2, 3].map((i) => <Bone key={i} className='h-10 rounded-xl' />)}
            </div>
            <div className='flex flex-col gap-6 rounded-3xl border border-brand-secondary bg-gray-50 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-10'>
                <div className='flex flex-col items-center gap-5 sm:flex-row lg:flex-1'>
                    <Bone className='h-36 w-36 shrink-0 rounded-full sm:h-40 sm:w-40' />
                    <div className='flex w-full flex-col gap-3'>
                        <Bone className='h-3 w-24' />
                        <Bone className='h-7 w-32' />
                        <Bone className='h-4 w-full' />
                        <Bone className='h-4 w-4/5' />
                    </div>
                </div>
                <div className='grid gap-2 sm:grid-cols-3 lg:w-80 lg:grid-cols-1'>
                    {[0, 1, 2].map((i) => <Bone key={i} className='h-14 rounded-xl' />)}
                </div>
            </div>
            {[0, 1, 2].map((i) =>
                <div key={i} className='overflow-hidden rounded-2xl border border-brand-secondary bg-white'>
                    <div className='flex items-center gap-3 border-b border-brand-secondary px-4 py-4 sm:px-6'>
                        <Bone className='h-11 w-11 rounded-xl' />
                        <div className='flex flex-col gap-2'>
                            <Bone className='h-5 w-36' />
                            <Bone className='h-3 w-48' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8'>
                        <div className='flex flex-col items-center gap-4 sm:flex-row lg:w-2/5 lg:flex-col lg:items-start'>
                            <Bone className='h-28 w-28 shrink-0 rounded-full sm:h-32 sm:w-32' />
                            <div className='w-full'><SkeletonText lines={3} /></div>
                        </div>
                        <div className='flex flex-1 flex-col gap-3'>
                            {[0, 1, 2].map((j) => <Bone key={j} className='h-16 rounded-xl' />)}
                        </div>
                    </div>
                </div>)}
        </SkeletonPage>
    )
}
