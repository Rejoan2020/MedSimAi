import React from 'react'
import PDFReader from './components/PDFReader'
import { Check, ChevronDown, Clock, PersonStanding } from 'lucide-react'
import Image from 'next/image'
import Options from '@/components/Options';
import Link from 'next/link';

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen text-black flex flex-col justify-center items-center p-8 gap-6 min-w-200 w-full">
      <div className='flex justify-between max-w-350 w-full'>
        <div className='flex'>
          <Image height={100} width={200} alt='person' src={'/cases/person.png'}
            className='h-30 w-36'
          />
          <div className="px-4 p-2 flex flex-col gap-2 max-w-350 min-w-100">
            <h1 className="text-xl font-semibold">
              Shortness of Breath
            </h1>
            <div className='text-Secondary-Text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div className='flex gap-1 text-blue-800'>
              <div className='flex justify-center items-center border rounded-lg p-1 bg-blue-100/30'>Intermediate</div>
              <div className='flex justify-center items-center border rounded-lg p-1 bg-blue-100/30'><Clock className='w-4 h-4' /> <div>10 minute</div></div>
              <div className='border rounded-lg flex p-1 items-center justify-center bg-blue-100/30'>
                <PersonStanding />
                <div>Adult</div>
              </div>
            </div>
          </div>
        </div>

        <Link 
        className='border bg-light-blue h-12 w-36 p-2 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500'
        href={`/cases/${id}/active-session`}
        >Start Session</Link>

      </div>

      <div className='flex flex-col gap-4 justify-between border border-gray-200 rounded-lg m-2 p-8 max-w-350'>
        <h1 className="text-xl font-semibold text-blue-800">
          Clinical Scenario
        </h1>
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.
        </div>
      </div>

      <div className="grid h-[calc(100vh-10rem)] grid-cols-2 gap-6 p-6 w-full max-w-350">

        <div className="min-h-0 overflow-hidden w-full">
          <PDFReader file="/cases/cardio-report.pdf" />
        </div>

        <div className="min-h-0 overflow-y-auto rounded-xl border border-gray-200 bg-gray-100/20 p-6 max-w-150">
          <div>
            <h1 className="text-xl font-semibold text-blue-800">
              Learning objectives
            </h1>
            <div className='text-Secondary-Text pb-4 border-b'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            <div className='flex gap-4 p-4'>
              <Check size={48} className='w-6 h-6 text-blue-500' />
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>

            <div className='flex gap-4 p-4'>
              <Check size={48} className='w-6 h-6 text-blue-500' />
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>

            <div className='flex gap-4 p-4'>
              <Check size={48} className='w-6 h-6 text-blue-500' />
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>

            <div className='flex gap-4 p-4'>
              <Check size={48} className='w-6 h-6 text-blue-500' />
              <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
            </div>
          </div>

          <div className=' border rounded-lg border-gray-200 bg-white p-6'>
            <div className='flex justify-between text-blue-800 border-b border-gray-200 pb-4 mb-4'>
              <div>How confident are you?</div>
              <ChevronDown />
            </div>
            <div className='text-deep-blue text-sm'>
              <div className='py-4'>Dietery Assessment</div>
              <div className='flex gap-2'>
                {Array.from({ length: 5 }, (val, index) => (<Options key={index} number={index + 1} />))}
              </div>
              <div className='flex justify-between text-gray-200 max-w-105'>
                <div>Not confident</div>
                <div>Very confident</div>
              </div>
            </div>

            <div className='text-deep-blue text-sm'>
              <div className='py-4'>Dietery Assessment</div>
              <div className='flex gap-2'>
                {Array.from({ length: 5 }, (val, index) => (<Options key={index} number={index + 1} />))}
              </div>
              <div className='flex justify-between text-gray-200 max-w-105'>
                <div>Not confident</div>
                <div>Very confident</div>
              </div>
            </div>

            <div className='text-deep-blue text-sm'>
              <div className='py-4'>History Taking</div>
              <div className='flex gap-2'>
                {Array.from({ length: 5 }, (val, index) => (<Options key={index} number={index + 1} />))}
              </div>
              <div className='flex justify-between text-gray-200 max-w-105'>
                <div>Not confident</div>
                <div>Very confident</div>
              </div>
            </div>

            <div className='text-deep-blue text-sm'>
              <div className='py-4'>Identifying and influences</div>
              <div className='flex gap-2'>
                {Array.from({ length: 5 }, (val, index) => (<Options key={index} number={index + 1} />))}
              </div>
              <div className='flex justify-between text-gray-200 max-w-105'>
                <div>Not confident</div>
                <div>Very confident</div>
              </div>
            </div>

            <div className='text-deep-blue text-sm'>
              <div className='py-4'>BDA diabetic model</div>
              <div className='flex gap-2'>
                {Array.from({ length: 5 }, (val, index) => (<Options key={index} number={index + 1} />))}
              </div>
              <div className='flex justify-between text-gray-200 max-w-105'>
                <div>Not confident</div>
                <div>Very confident</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='w-full max-w-350'>
        <div className="w-100 m-6 border border-gray-200 p-4 rounded-lg">
          <div className='flex justify-between text-blue-800 border-b border-gray-200 pb-4 mb-4'>
            <div>Consultation Plan</div>
            <ChevronDown />
          </div>
          <textarea
            className='border w-80 h-80 border-gray-200 rounded-lg p-4 outline-none'
            placeholder='Add your consultation plan here...'
          />
          <div className='flex gap-4 p-4'>
            <Check size={48} className='w-6 h-6 text-blue-500' />
            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          </div>
          <button className='border border-gray-200 p-2 rounded-lg w-full bg-light-blue text-white'>Save</button>

        </div>
      </div>

    </div>
  )
}