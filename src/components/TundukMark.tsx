/**
 * The site mark: a tunduk (yurt crown) read as a hub. One ring, eight poles, one centre.
 * Uses currentColor so it follows the surrounding text colour.
 */
export default function TundukMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className={className} fill="none">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="3.5" />
      <g stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" opacity="0.75">
        <path d="M32 8v48M8 32h48M15 15l34 34M49 15 15 49" />
      </g>
      <circle cx="32" cy="32" r="8.5" fill="currentColor" />
    </svg>
  )
}
