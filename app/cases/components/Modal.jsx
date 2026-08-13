import React from 'react'
import { Star, HardHatIcon, TypeIcon } from 'lucide-react'
import Card from './Card'
export default function Modal() {
  const filters = [
    {
      'icon': Star,
      'title': 'Specialty',
      'options': ['All', 'Cardiology', 'Respiratory', 'Gastroenterology', 'Neurology', 'Endocrinology'],
    },
    {
      'icon': HardHatIcon,
      'title': 'Difficulty',
      'options': ['All levels', 'Beginner', 'Intermediate', 'Advanced']
    },
    {
      'icon': TypeIcon,
      'title': 'Case Type',
      'options': ['History Taking', 'Diagnosis', 'Physical Examination', 'Investigation']
    }
  ]
  return (
    <div className='w-full border p-4'>
      <div className='w-full max-w-300'>
        <div className='font-bold'>Filter Cases</div>
      </div>
      <div>
        {filters.map((f, index) => <Card key={index} icon={f.icon} title={f.title} options={f.options} />)}
      </div>
    </div>
  )
}
