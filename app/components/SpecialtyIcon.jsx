import React from 'react'
import { Activity, Baby, Brain, HeartPulse, Scissors, Siren, Stethoscope, Wind } from 'lucide-react'

const ICONS = {
    cardiology: HeartPulse,
    respiratory: Wind,
    neurology: Brain,
    'general surgery': Scissors,
    surgery: Scissors,
    endocrinology: Activity,
    emergency: Siren,
    pediatrics: Baby,
    paediatrics: Baby,
};

export default function SpecialtyIcon({ specialty, className = '' }) {
    const Icon = ICONS[String(specialty ?? '').toLowerCase()] ?? Stethoscope;
    return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}
