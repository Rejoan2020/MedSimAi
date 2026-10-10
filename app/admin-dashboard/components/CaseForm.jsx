'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCase, updateCase } from '@/app/actions/adminCases'
import { caseToForm, DIFFICULTIES, GENDERS } from '@/utils/caseFields'

const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-light-blue focus:ring-2 focus:ring-light-blue/20'

function Section({ title, description, children }) {
    return (
        <section className='flex flex-col gap-5 border-t border-gray-200 pt-6 first:border-t-0 first:pt-0'>
            <div>
                <h2 className='text-lg font-semibold'>{title}</h2>
                {description && <p className='mt-1 text-sm text-gray-500'>{description}</p>}
            </div>
            {children}
        </section>
    )
}

export default function CaseForm({ initialCase }) {
    const router = useRouter()
    const isEdit = Boolean(initialCase?._id)

    const [values, setValues] = useState(() => caseToForm(initialCase))
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState(null)

    const set = (field) => (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setValues((prev) => ({ ...prev, [field]: value }))
    }

    // Small helpers so every field is wired the same way
    const text = (field, label, props = {}) => (
        <label className='flex flex-col gap-2 text-sm font-medium'>
            {label}
            <input value={values[field]} onChange={set(field)} className={inputClass} {...props} />
        </label>
    )
    const area = (field, label, props = {}) => (
        <label className='flex flex-col gap-2 text-sm font-medium'>
            {label}
            <textarea value={values[field]} onChange={set(field)} rows={4} className={inputClass} {...props} />
        </label>
    )
    const list = (field, label, placeholder) => area(field, <>{label} <span className='font-normal text-gray-500'>(one per line)</span></>, { placeholder, rows: 5 })
    const select = (field, label, options) => (
        <label className='flex flex-col gap-2 text-sm font-medium'>
            {label}
            <select value={values[field]} onChange={set(field)} className={inputClass}>
                {options.map((option) => <option key={option} value={option}>{option || 'Not specified'}</option>)}
            </select>
        </label>
    )
    const checkbox = (field, label) => (
        <label className='flex items-center gap-2 text-sm'>
            <input type='checkbox' checked={values[field]} onChange={set(field)} className='h-4 w-4' />
            {label}
        </label>
    )

    async function handleSubmit(e) {
        e.preventDefault()
        setIsSaving(true)
        setMessage(null)
        try {
            const result = isEdit
                ? await updateCase(initialCase._id, values)
                : await createCase(values)
            if (!result.success) throw new Error(result.message)

            if (isEdit) {
                setMessage({ ok: true, text: 'Changes saved.' })
                router.refresh()
            } else {
                router.push('/admin-dashboard/cases')
            }
        } catch (err) {
            setMessage({ ok: false, text: err.message || "Couldn't save the case." })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className='m-10 rounded-xl border border-gray-200 bg-white p-8'>
            <div className='mb-8 flex flex-wrap items-start justify-between gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-gray-900'>
                        {isEdit ? `Edit: ${initialCase.title}` : 'Create New Case'}
                    </h1>
                    <p className='mt-1 text-sm text-gray-500'>
                        {isEdit
                            ? <>Link: <Link href={`/cases/${initialCase.slug}`} className='text-light-blue hover:underline'>/cases/{initialCase.slug}</Link> (stays the same when you rename the case)</>
                            : 'Create a clinical case for students to practice.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <Section title='Basic information' description='What students see in the case list. Fields marked * are required.'>
                    {text('title', 'Case title *', { required: true, placeholder: 'e.g. Shortness of Breath' })}
                    {area('description', 'Case description *', { required: true, placeholder: 'A 45-year-old man presents with...' })}
                    <div className='grid gap-5 md:grid-cols-2'>
                        {text('specialty', 'Specialty', { placeholder: 'e.g. Respiratory' })}
                        {select('difficulty', 'Difficulty *', DIFFICULTIES)}
                        {text('durationMinutes', 'Duration in minutes *', { type: 'number', min: 1, required: true })}
                        {text('image', 'Image path (a file in /public)', { placeholder: '/cases/lungs.png' })}
                        {text('pdfUrl', 'Case document path (a PDF in /public)', { placeholder: '/cases/cardio-report.pdf' })}
                    </div>
                    {list('features', 'Tags', 'History Taking\nRespiratory')}
                    {checkbox('isPublished', 'Published (visible to students)')}
                </Section>

                <Section title='Patient' description='Who the AI plays. Students never see this section directly.'>
                    <div className='grid gap-5 md:grid-cols-2'>
                        {text('aiScenario.patient.name', 'Name')}
                        {text('aiScenario.patient.age', 'Age', { type: 'number', min: 0, max: 120 })}
                        {select('aiScenario.patient.gender', 'Gender', ['', ...GENDERS])}
                        {text('aiScenario.patient.occupation', 'Occupation')}
                    </div>
                    {area('aiScenario.patient.personality', 'Personality', { placeholder: 'Anxious but cooperative...' })}
                </Section>

                <Section title='History' description='What the patient knows and can tell the student when asked.'>
                    {area('aiScenario.clinicalData.historyOfPresentIllness', 'History of presenting illness', { rows: 6 })}
                    <div className='grid gap-5 md:grid-cols-2'>
                        {list('aiScenario.clinicalData.symptoms.present', 'Symptoms present')}
                        {list('aiScenario.clinicalData.symptoms.absent', 'Symptoms absent (the patient denies these)')}
                        {list('aiScenario.clinicalData.pastMedicalHistory', 'Past medical history')}
                        {list('aiScenario.clinicalData.medications', 'Medications')}
                        {list('aiScenario.clinicalData.allergies', 'Allergies')}
                        {list('aiScenario.clinicalData.familyHistory', 'Family history')}
                    </div>
                    <div className='grid gap-5 md:grid-cols-3'>
                        {text('aiScenario.clinicalData.socialHistory.smoking', 'Smoking')}
                        {text('aiScenario.clinicalData.socialHistory.alcohol', 'Alcohol')}
                        {text('aiScenario.clinicalData.socialHistory.occupation', 'Work and lifestyle')}
                    </div>
                </Section>

                <Section title='AI behaviour'>
                    {area('aiScenario.behavior.communicationStyle', 'Communication style')}
                    {area('aiScenario.behavior.emotionalState', 'Emotional state')}
                    <div className='flex flex-col gap-3'>
                        {checkbox('aiScenario.behavior.revealInformationOnlyWhenAsked', 'Only reveal information when asked')}
                        {checkbox('aiScenario.behavior.revealDiagnosis', 'Patient already knows their diagnosis')}
                        {checkbox('aiScenario.behavior.useMedicalTerminology', 'Patient may use medical terminology')}
                    </div>
                </Section>

                <Section title='Examination'>
                    {area('aiScenario.examination.generalAppearance', 'General appearance')}
                    <div className='grid gap-5 md:grid-cols-3'>
                        {text('aiScenario.examination.vitals.temperature', 'Temperature (°C)', { type: 'number', step: '0.1' })}
                        {text('aiScenario.examination.vitals.heartRate', 'Heart rate (bpm)', { type: 'number' })}
                        {text('aiScenario.examination.vitals.respiratoryRate', 'Respiratory rate (/min)', { type: 'number' })}
                        {text('aiScenario.examination.vitals.bloodPressure', 'Blood pressure', { placeholder: '120/80' })}
                        {text('aiScenario.examination.vitals.oxygenSaturation', 'Oxygen saturation (%)', { type: 'number' })}
                    </div>
                    {list('aiScenario.examination.findings', 'Examination findings')}
                </Section>

                <Section title='Diagnosis and marking' description='Used to evaluate the student. Never shown to students before feedback.'>
                    {text('aiScenario.diagnosis.primary', 'Primary diagnosis *', { required: true })}
                    {list('aiScenario.diagnosis.differentials', 'Differential diagnoses')}
                    <div className='grid gap-5 md:grid-cols-2'>
                        {list('aiScenario.evaluation.expectedQuestions', 'Questions the student should ask')}
                        {list('aiScenario.evaluation.criticalFindings', 'Critical findings')}
                    </div>
                </Section>

                <div className='flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-6'>
                    {message && <p className={`mr-auto text-sm ${message.ok ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
                    <Link href='/admin-dashboard/cases' className='rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50'>
                        {isEdit ? 'Back to cases' : 'Cancel'}
                    </Link>
                    <button
                        type='submit'
                        disabled={isSaving}
                        className='rounded-lg bg-light-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50'
                    >
                        {isSaving ? 'Saving...' : isEdit ? 'Save changes' : 'Create case'}
                    </button>
                </div>
            </form>
        </div>
    )
}
