import React from 'react'
import Welcome from './Welcome'
import Card from './Card'
import { BookCheck, TargetIcon, LucideBookMarked, Laptop, ArrowRight } from 'lucide-react';
import CaseCard from './CaseCard'
import RecentResults from './RecentResults';

export default function Dashboard() {
    const cards = [
        {
            'title': 'Cases Attempted',
            'number': '8',
            'icon': BookCheck,
        },
        {
            'title': 'Average Score',
            'number': '78%',
            'icon': TargetIcon,
        },
        {
            'title': 'Total Sessions',
            'number': '7',
            'icon': Laptop,
        }
    ]
    const cases = [
        {
            'title': 'Infant with Fever and Irritability',
            'type': 'Pediatrics',
            'level': 'Beginner',
        },
        {
            'title': 'Newly Diagnosed Hypertension in Primary Care',
            'type': 'Family Medicine',
            'level': 'Intermediate',
        },
        {
            'title': 'Hypothyroidism',
            'type': 'Family Medicine',
            'level': 'Intermediate',
        }
    ]
    
    return (
        <div className='w-full m-8 flex flex-col items-center gap-8'>
            <Welcome />
            <div className='grid grid-cols md:grid-cols-2 xl:grid-cols-3 justify-between w-full max-w-350 '>
                {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
            </div>
            <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
                <div className='flex gap-2 items-center pb-4'>
                    <TargetIcon />
                    <div className='font-bold text-[24px]'>Recommended next cases</div>
                </div>

                {cases.map((cs, index) => <CaseCard key={index} title={cs.title} type={cs.type} level={cs.level} />)}
            </div>
            <div className='flex flex-col gap-2 border p-8 w-full max-w-350 rounded-lg border-brand-secondary hover:border-brand-primary'>
                <div className='flex gap-2 items-center pb-4 justify-between'>
                    <div className='flex gap-2 items-center'>
                        <LucideBookMarked />
                        <div className='font-bold text-[24px]'>Already attempted cases</div>
                    </div>
                    <div className='flex gap-1 text-deep-blue hover:text-light-blue cursor-pointer'><div> View All </div> <ArrowRight /></div>
                </div>

                {cases.map((cs, index) => <CaseCard key={index} title={cs.title} type={cs.type} level={cs.level} />)}
            </div>
            <RecentResults /> 
        </div>
    )
}
