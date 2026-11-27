export default function ProductionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-lake/40 bg-lake-soft px-2.5 py-1 text-[0.75rem] font-semibold leading-none text-lake">
      <span aria-hidden="true" className="pulse-dot h-1.5 w-1.5 rounded-full bg-lake" />
      {label}
    </span>
  )
}
