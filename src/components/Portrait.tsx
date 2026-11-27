import { SITE } from '../data/site'

/** The portrait in a circle, framed by a slowly turning ring of poles (the site mark, at scale). */
export default function Portrait({ alt, className = '', eager = false }: { alt: string; className?: string; eager?: boolean }) {
  return (
    <div className={`relative ${className}`}>
      <svg aria-hidden="true" viewBox="-110 -110 220 220" className="spin-slow pointer-events-none absolute -inset-[9%] h-[118%] w-[118%] text-accent">
        <circle r="104" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 5" />
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} y1="-104" y2={i % 6 === 0 ? -97 : -101} stroke="currentColor" strokeWidth={i % 6 === 0 ? 1.4 : 0.8} transform={`rotate(${i * 15})`} />
        ))}
      </svg>
      <img
        src={SITE.portrait}
        alt={alt}
        width={960}
        height={958}
        className="relative aspect-square w-full rounded-full border border-line object-cover"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
