import React from 'react'
import Header from '../dashboard/components/Header'
import Card from '../dashboard/components/Card'
import Footer from '../dashboard/components/Footer'

export default function Dashboard() {
    const cards = [
        {
            'title': 'Total enrolled students',
            'number': 214,
            'icon': '/icons/students.svg',
        },
        {
            'title': 'Total completed students',
            'number': 32,
            'icon': '/icons/completed.svg',
        },
        {
            'title': 'Average Score',
            'number': 67,
            'icon': '/icons/medal.svg',
        },
        {
            'title': 'Students at Risk',
            'number': 214,
            'icon': '/icons/risk.svg',
        },
        
    ]
    return (
        <div className='m-10 w-full'>
            <div className='mb-10'>
                <a className='text-[#717680]'>Learning paths {'>'} </a>
                E2E Test path</div>
            <div className='flex flex-col gap-4'>
                <Header />
                <div className='h-14 w-80 border mt-4 flex justify-center items-center border border-[#F0F4FE] rounded-full bg-[#FFFFFF]'>
                    <div className='border h-10 w-38 rounded-full flex justify-center items-center bg-[#6796F2] text-white'>Overview</div>
                    <div className='border-0 h-10 w-38 rounded-full flex justify-center items-center'>Students</div>
                </div>
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2'>
                    {cards.map((card, index) => <Card key={index} title = {card.title} number = {card.number} icon = {card.icon}/>)}
                </div>
                <Footer/>
            </div>
        </div>
    )
}
