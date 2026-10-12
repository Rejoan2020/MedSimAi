export function scoreBand(score) {
    if (score >= 90) return { label: 'Excellent', color: '#15803D', pill: 'bg-green-100 text-green-700' }
    if (score >= 80) return { label: 'Very good', color: '#16A34A', pill: 'bg-green-100 text-green-700' }
    if (score >= 70) return { label: 'Good', color: '#307BC4', pill: 'bg-brand-primary text-light-blue' }
    if (score >= 60) return { label: 'Needs improvement', color: '#D97706', pill: 'bg-amber-100 text-amber-700' }
    return { label: 'Poor', color: '#DC2626', pill: 'bg-red-100 text-red-700' }
}

const RING_SIZES = {
    sm: { outer: 'h-14 w-14', inner: 'h-11 w-11', text: 'text-sm' },
    md: { outer: 'h-28 w-28 sm:h-32 sm:w-32', inner: 'h-22 w-22 sm:h-26 sm:w-26', text: 'text-2xl' },
    lg: { outer: 'h-36 w-36 sm:h-40 sm:w-40', inner: 'h-28 w-28 sm:h-32 sm:w-32', text: 'text-4xl' },
}

export function ScoreRing({ score, size = 'md' }) {
    const band = scoreBand(score)
    const s = RING_SIZES[size]

    return (
        <div
            role='img'
            aria-label={`${score} out of 100, ${band.label.toLowerCase()}`}
            className={`flex shrink-0 items-center justify-center rounded-full ${s.outer}`}
            style={{ background: `conic-gradient(${band.color} 0 ${score}%, var(--color-brand-primary) ${score}% 100%)` }}
        >
            <div className={`flex flex-col items-center justify-center rounded-full ${s.inner} bg-white`}>
                <span className={`font-bold leading-none ${s.text}`} style={{ color: band.color }}>{score}</span>
                {size !== 'sm' && <span className='mt-1 text-xs text-Secondary-Text'>out of 100</span>}
            </div>
        </div>
    )
}

export function IconTile({ icon: Icon, className = 'bg-brand-primary text-light-blue' }) {
    return (
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${className}`}>
            <Icon className='h-5 w-5' strokeWidth={1.9} aria-hidden />
        </div>
    )
}
