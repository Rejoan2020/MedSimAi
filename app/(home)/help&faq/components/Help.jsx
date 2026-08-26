import React from 'react' 
import { HelpCircle } from 'lucide-react'
import FAQ from './FAQ'

export default function Help() {
    return (
        <div className="w-full px-8 py-8 text-black h-screen"> 
            <div className="mb-8">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-light-blue/10">
                        <HelpCircle className="h-5 w-5 text-light-blue" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold">
                            Frequently Asked Questions
                        </h1>

                        <p className="mt-1 text-sm text-Secondary-Text">
                            Find answers to common questions about MedSimAI.
                        </p>
                    </div>

                </div>
            </div>

 
            <div className="max-w-4xl">
                <FAQ />
            </div>

        </div>
    )
}