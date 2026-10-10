'use client'
import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { useState } from 'react'
import Levels from './Levels'
import Modal from './Modal'
import CaseCard from './CaseCard'

export default function Cases({ data }) {
    const [keyword, setKeyword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [difficulty, setDifficulty] = useState('All');
    const [specialty, setSpecialty] = useState('All');
    const [casetype, setCasetype] = useState('All');
    const cards = data.data;
    const searchedData = cards.filter((card) => {
        if (keyword === '') return true;
        return card.title.toLowerCase().includes(keyword.toLocaleLowerCase());
    })
    const filteredByDifficulty = searchedData.filter((card) => {
        if (difficulty.toLocaleLowerCase() == 'all') return true;
        return card.difficulty.toLowerCase().includes(difficulty.toLocaleLowerCase());
    })

    const filteredBySpecialty = filteredByDifficulty.filter((card) => {
        if (specialty.toLocaleLowerCase() == 'all') return true;
        return card.specialty.toLowerCase().includes(specialty.toLocaleLowerCase());
    })

    const filteredByCasetype = filteredBySpecialty.filter((card) => {
        if (casetype.toLocaleLowerCase() == 'all') return true; 
        return card.features.includes(casetype);
    })

    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];


    return (
        <div className='w-full sm:min-w-155 flex flex-col items-center p-8 gap-6'>
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
            {isModalOpen &&
                <Modal
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    specialty={specialty}
                    setSpecialty={setSpecialty}
                    casetype={casetype}
                    setCasetype={setCasetype}
                />
            }
            <div className='grid grid-cols-2 sm:grid-cols-4 justify-center items-center w-full max-w-350 gap-2 '>
                {levels.map((lvl, index) =>
                    <Levels
                        key={index}
                        title={lvl}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                    />)
                }
            </div>
            <div className='grid grid-cols-1 2xl:grid-cols-2 w-full max-w-350 gap-8'>
                {
                    filteredByCasetype.length === 0 ?
                        <div >No data available</div> :
                        filteredByCasetype.map((item) => (
                            <CaseCard
                                key={item._id}
                                title={item.title}
                                slug={item.slug}
                                image={item.image}
                                specialty={item.specialty}
                                difficulty={item.difficulty}
                                duration={item.duration}
                                patient={23}
                                description={item.description}
                                tags={item.features}
                            />
                        ))}
            </div>
        </div>

    )
}
