'use client'
import React from 'react'
import Header from '../admin-dashboard/components/Header'
import Card from '../admin-dashboard/components/Card'
import Footer from '../admin-dashboard/components/Footer'

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
    const cases = [
        {
            id: 1,
            title: "Shortness of Breath",
            image: '/cases/lungs.png',
            specialty: "Respiratory",
            difficulty: "Beginner",
            duration: "10 minutes",
            patient: {
                age: 45,
                gender: "Male"
            },
            chiefComplaint: "Progressive shortness of breath for 3 days.",
            description:
                "A 45-year-old man presents with worsening shortness of breath accompanied by cough and fever.",
            tags: ["History Taking", "Respiratory", "Diagnosis"],
            status: "Not Started"
        },
        {
            id: 2,
            title: "Acute Chest Pain",
            image: '/cases/chestt.jpg',
            specialty: "Cardiology",
            difficulty: "Intermediate",
            duration: "15 minutes",
            patient: {
                age: 58,
                gender: "Male"
            },
            chiefComplaint: "Sudden onset of chest pain for 30 minutes.",
            description:
                "A 58-year-old man presents to the emergency department with severe central chest pain radiating to his left arm.",
            tags: ["History Taking", "Emergency", "Cardiology"],
            status: "Not Started"
        },
        {
            id: 3,
            title: "Severe Headache",
            image: '/cases/headache.webp',
            specialty: "Neurology",
            difficulty: "Beginner",
            duration: "20 minutes",
            patient: {
                age: 32,
                gender: "Female"
            },
            chiefComplaint: "Sudden severe headache with nausea and vomiting.",
            description:
                "A 32-year-old woman presents with a sudden, severe headache that began earlier today.",
            tags: ["History Taking", "Neurology", "Investigation"],
            status: "Not Started"
        }
    ];

    const handleClick = async () => {
        const response = await fetch("/api/cases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cases[2])
        });
        const data = await response.json();

        console.log(data);
    }

    return (
        <div className='m-10 w-full'>
            <div className='mb-10'>
                <a className='text-[#717680]'>Learning paths {'>'} </a>
                E2E Test path</div>
            <div className='flex flex-col gap-4'>
                <Header />
                <button
                    className='border p-4 bg-light-blue text-white cursor-pointer hover:bg-blue-500'
                    onClick={handleClick}
                >Create</button>
                <div className='h-14 w-80 border mt-4 flex justify-center items-center border border-[#F0F4FE] rounded-full bg-[#FFFFFF]'>
                    <div className='border h-10 w-38 rounded-full flex justify-center items-center bg-[#6796F2] text-white'>Overview</div>
                    <div className='border-0 h-10 w-38 rounded-full flex justify-center items-center'>Students</div>
                </div>
                <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-2'>
                    {cards.map((card, index) => <Card key={index} title={card.title} number={card.number} icon={card.icon} />)}
                </div>
                <Footer />
            </div>
        </div>
    )
}
