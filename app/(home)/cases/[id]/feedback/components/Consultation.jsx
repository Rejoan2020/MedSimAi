import React from 'react'
import Block from './Block'
import Details from './Details'
import { useState } from 'react';

export default function Consultation({ consultation }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={consultation.score} title={'Consultation'} description={consultation.description} showMore={showMore} setShowMore={setShowMore} />
            </div>
            {showMore &&
                <Details
                    performance={consultation.performance}
                    strengths={consultation.strengths}
                    improvements={consultation.improvements}
                    recommendations={consultation.recommendations}
                />
            }
        </>
    )
}
