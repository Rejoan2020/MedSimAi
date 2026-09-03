import React, { useState } from 'react'
import Block from './Block'
import Details from './Details'

export default function MedicalKnowledge({ medicalKnowledge }) {
    const [showMore, setShowMore] = useState(false);
    return (
        <>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={medicalKnowledge.score} title={'Clinical Reasoning'} description={medicalKnowledge.description} showMore={showMore} setShowMore={setShowMore} />
            </div>
            {showMore &&
                <Details performance={medicalKnowledge.performance}
                    strengths={medicalKnowledge.strengths}
                    improvements={medicalKnowledge.improvements}
                    recommendations={medicalKnowledge.recommendations} />}
        </>
    )
}
