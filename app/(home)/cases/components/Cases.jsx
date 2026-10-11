'use client'
import React, { useMemo, useState } from 'react'
import { SearchIcon, SlidersHorizontal, Stethoscope } from 'lucide-react'
import CaseCard from './CaseCard'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const selectClass = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20';

// Unique, sorted values for a filter, built from the cases themselves
function optionsFrom(values) {
    return ['All', ...[...new Set(values.filter(Boolean))].sort()];
}

export default function Cases({ data, stats = {} }) {
    const cards = data.data;
    const [keyword, setKeyword] = useState('');
    const [difficulty, setDifficulty] = useState('All');
    const [specialty, setSpecialty] = useState('All');
    const [casetype, setCasetype] = useState('All');
    // On phones the filters are behind a button to keep the list near the top
    const [showFilters, setShowFilters] = useState(false);

    const specialties = useMemo(() => optionsFrom(cards.map((c) => c.specialty)), [cards]);
    const caseTypes = useMemo(() => optionsFrom(cards.flatMap((c) => c.features ?? [])), [cards]);

    const filtered = cards.filter((card) =>
        (keyword === '' || card.title.toLowerCase().includes(keyword.trim().toLowerCase())) &&
        (difficulty === 'All' || card.difficulty === difficulty) &&
        (specialty === 'All' || card.specialty === specialty) &&
        (casetype === 'All' || (card.features ?? []).includes(casetype))
    );

    const hasFilters = keyword || difficulty !== 'All' || specialty !== 'All' || casetype !== 'All';
    function clearFilters() {
        setKeyword(''); setDifficulty('All'); setSpecialty('All'); setCasetype('All');
    }

    return (
        <PageContainer>
            <PageHeader
                eyebrow='Case library'
                title='Clinical Cases'
                description={`${cards.length} ${cards.length === 1 ? 'case' : 'cases'} available`}
                icon={Stethoscope}
            />

            <div className='flex flex-col gap-3 rounded-2xl border border-brand-secondary bg-white p-4'>
                <div className='flex gap-2'>
                <label className='flex flex-1 items-center gap-2 rounded-lg border border-gray-300 px-3 focus-within:border-light-blue focus-within:ring-2 focus-within:ring-light-blue/20'>
                    <SearchIcon className='h-5 w-5 text-Secondary-Text' />
                    <span className='sr-only'>Search cases</span>
                    <input
                        type='search'
                        placeholder='Search clinical cases...'
                        className='h-11 w-full bg-transparent outline-none'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </label>
                <button
                    type='button'
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                    className='flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 text-sm cursor-pointer sm:hidden'
                >
                    <SlidersHorizontal className='h-4 w-4' /> Filters
                </button>
                </div>

                <div className={`${showFilters ? 'grid' : 'hidden'} gap-3 sm:grid sm:grid-cols-3`}>
                    <label className='flex flex-col gap-1 text-xs font-medium text-Secondary-Text'>
                        Difficulty
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className={selectClass}>
                            {LEVELS.map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1 text-xs font-medium text-Secondary-Text'>
                        Specialty
                        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={selectClass}>
                            {specialties.map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </label>
                    <label className='flex flex-col gap-1 text-xs font-medium text-Secondary-Text'>
                        Case type
                        <select value={casetype} onChange={(e) => setCasetype(e.target.value)} className={selectClass}>
                            {caseTypes.map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </label>
                </div>

                {hasFilters &&
                    <div className='flex items-center justify-between text-sm text-Secondary-Text'>
                        <span>Showing {filtered.length} of {cards.length}</span>
                        <button type='button' onClick={clearFilters} className='text-light-blue hover:underline cursor-pointer'>Clear filters</button>
                    </div>}
            </div>

            {filtered.length === 0
                ? <div className='rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-Secondary-Text'>
                    No cases match your search.
                </div>
                : <div className='grid gap-6 lg:grid-cols-2'>
                    {filtered.map((item, index) => (
                        <CaseCard
                            key={item._id}
                            title={item.title}
                            slug={item.slug}
                            image={item.image}
                            specialty={item.specialty}
                            difficulty={item.difficulty}
                            duration={item.duration}
                            patient={item.aiScenario?.patient}
                            completedBy={stats[item._id]?.completedBy ?? 0}
                            bestScore={stats[item._id]?.bestScore ?? null}
                            description={item.description}
                            tags={item.features ?? []}
                            priority={index === 0}
                        />
                    ))}
                </div>}
        </PageContainer>
    )
}
