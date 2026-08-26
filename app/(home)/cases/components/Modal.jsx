import React from 'react'
import { Star, HardHatIcon, TypeIcon } from 'lucide-react'
import Card from './Card'
export default function Modal({ difficulty, setDifficulty, specialty, setSpecialty, casetype, setCasetype }) {
  const filters = [
    {
      'icon': Star,
      'title': 'Specialty',
      'options': ['All', 'Cardiology', 'Respiratory', 'Gastroenterology', 'Neurology', 'Endocrinology'],
      'selected': 'All'
    },
    {
      'icon': HardHatIcon,
      'title': 'Difficulty',
      'options': ['All', 'Beginner', 'Intermediate', 'Advanced']
    },
    {
      'icon': TypeIcon,
      'title': 'Case Type',
      'options': ['All', 'History Taking', 'Diagnosis', 'Phys. Examination', 'Investigation']
    }
  ]
  const val = [specialty, difficulty, casetype];
  const setVal = [setSpecialty, setDifficulty, setCasetype];

  return (
    <div className='w-full max-w-350 border p-4 rounded-lg'>
      <div className='w-full max-w-350'>
        <div className='font-bold'>Filter Cases</div>
      </div>
      <div className='grid grid-cols-3 justify-between gap-2 max-sm:grid-cols-2'>
        {filters.map((f, index) => {
          return <Card
            key={index}
            icon={f.icon}
            title={f.title}
            options={f.options}
            value={val[index]}
            setVal={setVal[index]}
          />
        })}
      </div>
    </div>
  )
}
