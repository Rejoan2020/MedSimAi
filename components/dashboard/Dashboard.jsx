import React from 'react'
import Welcome from './Welcome'
import Card from './Card'
import { BookCheck, TargetIcon, Laptop } from 'lucide-react'

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
    return (
        <div className='w-full m-8 flex flex-col items-center gap-8'>
            <Welcome />
            <div className='flex justify-between w-full max-w-220 '>
                {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
            </div>
            <div>Recommended Next Cases</div>
            <div>Already Attempted Cases</div>
            <div>Recent Results</div>
        </div>
    )
}
