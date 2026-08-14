import { ArrowRight, Clock, File, PersonStanding } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Stars from './Stars'

export default function CaseCard({ title, image, tags, specialty, difficulty, duration, patient, description, }) {
    const cardSide = [
        {
            'title': 'Specialty',
            'value': 'Pulmology',
        },
        {
            'title': 'Difficulty',
            'value': <Stars />,
        },
        {
            'title': 'Completed by',
            'value': '1042 learners',
        },
        {
            'title': 'Your best score',
            'value': '78%',
        }
    ]
    return (
        <div className='border border-brand-secondary rounded-lg p-4'>
            <div className='flex'>
                <div className='w-full min-w-90'>
                    <div className='flex pb-2'>
                        <div className='h-50 w-100 border border-brand-secondary rounded-lg m-2'>
                            <Image
                                height={200} width={200} alt='Lungs' src={image}
                                className='p-4 h-40 w-40'
                            />
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='text-[24px] font-bold'>{title}</div>
                            <div className='text-Secondary-Text'>{description}</div>
                            <div className='flex gap-2'>
                                <div className='border p-1'>{difficulty}</div>
                                <div className='flex justify-center items-center border p-1'><Clock className='w-4 h-4' /> <div>{duration}</div></div>
                                <div className='border flex p-1 items-center'>
                                    <PersonStanding />
                                    <div>{patient.age >= 18 ? "Adult" : "Pediatric patient"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-b border-brand-secondary'></div>
                    <div>
                        <div className='font-bold'>Case Features</div>
                        <div className='flex gap-2'>
                            {tags.map((t, index) =>
                                <div key={index} className='flex justify-center items-center'>
                                    <File className='w-4 h-4 text-light-blue' />
                                    <div className='text-deep-blue'>{t}</div>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className='border-l ml-4 pl-4 border-brand-secondary flex flex-col gap-4 max-w-40 w-full'>
                    {cardSide.map((card, index) =>
                        <div key={index}>
                            <div className='font-bold text-Secondary-Text'>{card.title}</div>
                            <div className='text-lg'>{card.value}</div>
                        </div>
                    )}

                </div>
            </div>
            <div className='border-t border-brand-secondary mt-4 pt-4 flex justify-end'>
                <div className='text-white border p-2 flex justify-evenly px-4 bg-deep-blue'>
                    <div>Start Case</div>
                    <ArrowRight />
                </div>
            </div>
        </div>
    )
}
