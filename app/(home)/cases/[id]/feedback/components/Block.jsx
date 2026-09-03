import ResponsiveCircle from '@/components/ResponsiveCircle'
import { ChevronDown } from 'lucide-react'  

export default function Block({ percentage, title, description, showMore, setShowMore }) { 

    return (
        <div className='flex flex-col gap-8 w-full bg-blue-100 h-16 items-center p-4 border border-gray-100 rounded-t-lg'>
            <div className='w-full flex justify-between'>
                <div className='text-deep-blue font-bold'>{title}</div>
                <button
                    type="button"
                    onClick={() => setShowMore(prev => !prev)}
                    className="cursor-pointer flex items-center gap-1 p-1 rounded-lg bg-white border-0"
                >
                    <div>{showMore ? 'Hide details' : 'Show details'}</div>

                    <ChevronDown
                        className={`transition-transform ${showMore ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            </div>

            <div className='w-full flex gap-8'>
                <div>
                    <ResponsiveCircle percentage={percentage} />
                </div>
                <div>
                    <div className='text-[18px] font-semibold'>Needs Improvement</div>
                    <div className='text-Secondary-Text'>{description}</div>
                </div>
            </div>
        </div>
    )
}
