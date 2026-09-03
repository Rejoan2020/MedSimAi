import React, { useState } from 'react'
import Block from './Block'
import Details from './Details'

export default function Communication({ communication }) {
    const [showMore, setShowMore] = useState();
    return (
        <>
            <div className='flex flex-col w-full max-w-350 bg-white min-h-64 border border-gray-100 rounded-lg'>
                <Block percentage={communication.score} title={'Communication'} description={communication.description} showMore={showMore} setShowMore={setShowMore} />
            </div>
            {showMore &&
                <Details performance={communication.performance}
                    strengths={communication.strengths}
                    improvements={communication.improvements}
                    recommendations={communication.recommendations} />}
        </>
    )
}
