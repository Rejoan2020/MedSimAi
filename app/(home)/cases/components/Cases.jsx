'use client'
import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { useState } from 'react'
import Levels from './Levels'
import Modal from './Modal'
import CaseCard from './CaseCard'

export default function Cases() {
    const [keyword, setKeyword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
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
            difficulty: "Advanced",
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
    return (
        <div className='w-full min-w-150 flex flex-col items-center p-8 gap-6'>
            <div className='flex justify-between w-full max-w-350'>
                <div>
                    <div className='font-bold text-[24px]'>Clinical Cases</div>
                    <div className='text-Secondary-Text'>XYZ College of Medicine</div>
                </div>
                <div>
                    <div className='text-right font-bold text-[24px]'>40</div>
                    <div className='text-Secondary-Text'>Cases available</div>
                </div>
            </div>
            <div className='flex w-full max-w-350 gap-2'>
                <Search keyword={keyword} setKeyword={setKeyword} />
                <Filter isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
            {isModalOpen && <Modal />}
            <div className='flex w-full max-w-350 gap-2'>
                {levels.map((lvl, index) => <Levels key={index} title={lvl} />)}
            </div>
            <div className='grid grid-cols-1 2xl:grid-cols-2 w-full max-w-350 gap-8'>
                {cases.map((item) => (
                    <CaseCard
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        specialty={item.specialty}
                        difficulty={item.difficulty}
                        duration={item.duration}
                        patient={item.patient}
                        description={item.description}
                        tags = {item.tags}
                    />
                ))}
            </div>
        </div>

    )
}
