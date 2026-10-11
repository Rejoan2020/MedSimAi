import React from 'react'
import { HelpCircle } from 'lucide-react'
import FAQ from './FAQ'
import PageHeader, { PageContainer } from '@/app/components/PageHeader'

export default function Help({ questions }) {
    return (
        <PageContainer>
            <PageHeader
                eyebrow='Help centre'
                title='Frequently Asked Questions'
                description='Find answers to common questions about MedSimAI.'
                icon={HelpCircle}
            />
            <div className="max-w-4xl">
                <FAQ questions={questions} />
            </div>
        </PageContainer>
    )
}
