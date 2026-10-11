import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Sparkles } from 'lucide-react'
import SpecialtyIcon from '@/app/components/SpecialtyIcon'

// Organic outlines: a pale back shape, a bold blue shape, and a dome for the photo
const BLOB_BACK = '42% 58% 35% 65% / 58% 38% 62% 42%'
const BLOB_BLUE = '63% 37% 54% 46% / 45% 52% 48% 55%'
const BLOB_PHOTO = '48% 52% 40% 60% / 62% 58% 42% 38%'

// Dashboard hero: headline and call to action on the left, doctor photo in layered
// blue blobs on the right, and the student's stats in a card overlapping the bottom
export default function Welcome({ name, stats, nextCase }) {
  const firstName = name?.split(' ')[0]

  return (
    <section className='relative overflow-hidden rounded-3xl border border-brand-secondary bg-white'>
      <div className='grid items-center gap-6 px-6 pt-8 sm:px-10 sm:pt-10 lg:grid-cols-[1.15fr_1fr] lg:gap-4'>
        {/* Text */}
        <div className='relative z-10 max-w-xl pb-2 lg:pb-24'>
          <div className='eyebrow flex items-center gap-2'>
            <Sparkles className='h-3.5 w-3.5' /> Welcome back{firstName ? `, ${firstName}` : ''}
          </div>
          <h1 className='mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[2.75rem] xl:text-5xl'>
            Sharpen Your Clinical Skills, One Patient at a Time
          </h1>
          <p className='mt-5 text-base text-Secondary-Text sm:text-lg'>
            Practise real consultations with AI patients and get feedback on every decision you make.
          </p>
          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Link href='/cases' className='inline-flex items-center gap-2 rounded-full bg-light-blue px-7 py-3.5 font-semibold text-white shadow-[0_10px_25px_-8px_rgb(48_123_196_/_0.7)] hover:bg-primary-dark'>
              Browse cases <ArrowRight className='h-4 w-4' />
            </Link>
            {nextCase &&
              <Link href={`/cases/${nextCase.slug}`} className='font-semibold text-light-blue hover:text-primary-dark'>
                Start next case
              </Link>}
          </div>
        </div>

        {/* Doctor in layered blobs, with floating cards */}
        <div className='relative mx-auto h-80 w-full max-w-md sm:h-96 lg:h-[30rem] lg:max-w-none'>
          <div
            aria-hidden
            className='absolute -right-16 -top-4 h-[100%] w-[105%] bg-[#E3EFFB]'
            style={{ borderRadius: BLOB_BACK }}
          />
          <div
            aria-hidden
            className='absolute -right-4 bottom-0 h-[88%] w-[92%] bg-gradient-to-br from-[#5AA3EA] via-light-blue to-[#2563A3] shadow-[0_30px_60px_-30px_rgb(37_99_163_/_0.8)]'
            style={{ borderRadius: BLOB_BLUE }}
          />
          <div
            className='absolute bottom-0 right-8 h-[80%] w-[70%] overflow-hidden ring-[10px] ring-white/25'
            style={{ borderRadius: BLOB_PHOTO }}
          >
            <Image
              src='/dashboard/doctor.png'
              alt='Smiling doctor holding a tablet'
              fill
              priority
              sizes='(min-width: 1024px) 380px, 70vw'
              className='object-cover object-top'
            />
            {/* Blend the bottom of the photo into the blue shape */}
            <div aria-hidden className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-light-blue/60 to-transparent' />
          </div>

          {/* Simulated patient message */}
          <div className='absolute right-0 top-10 hidden w-56 items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-[0_12px_30px_-12px_rgb(39_71_96_/_0.35)] backdrop-blur sm:flex'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-light-blue text-xs font-semibold text-white'>AI</div>
            <div className='min-w-0'>
              <div className='text-sm font-semibold'>Simulated patient</div>
              <div className='truncate text-xs text-Secondary-Text'>Doctor, the pain is spreading...</div>
            </div>
          </div>

          {/* Next recommended case */}
          {nextCase &&
            <Link
              href={`/cases/${nextCase.slug}`}
              className='absolute bottom-24 left-0 hidden w-64 flex-col gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-[0_12px_30px_-12px_rgb(39_71_96_/_0.35)] backdrop-blur hover:bg-white sm:flex lg:bottom-32'
            >
              <div className='flex items-center gap-3'>
                <SpecialtyIcon specialty={nextCase.specialty} className='h-10 w-10 shrink-0 rounded-full bg-brand-primary p-2 text-light-blue' />
                <div className='min-w-0'>
                  <div className='truncate text-sm font-semibold'>{nextCase.title}</div>
                  <div className='text-xs text-Secondary-Text'>{nextCase.specialty}</div>
                </div>
              </div>
              <div className='flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-deep-blue shadow-sm'>
                <Clock className='h-3.5 w-3.5 text-light-blue' />
                Next case · {nextCase.difficulty}
              </div>
            </Link>}
        </div>
      </div>

      {/* Stats card overlapping the bottom of the hero */}
      <div className='relative z-10 mx-4 -mt-6 mb-4 grid grid-cols-3 rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgb(39_71_96_/_0.35)] ring-1 ring-brand-secondary sm:mx-10 sm:mb-8 lg:-mt-20'>
        {stats.map((stat) =>
          <div key={stat.label} className='px-2 py-5 text-center sm:py-7'>
            <div className='text-2xl font-bold sm:text-4xl'>{stat.value}</div>
            <div className='mt-1 text-xs text-Secondary-Text sm:text-sm'>{stat.label}</div>
          </div>)}
      </div>
    </section>
  )
}
