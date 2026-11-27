import { Clapperboard } from 'lucide-react'
import { useI18n } from '../i18n'

/**
 * Shown in place of YouTubeVideo while a project's video id is not configured.
 * Same 16:9 frame as the player, so the page layout does not shift once the id is set.
 */
export default function VideoPlaceholder({ envVar, poster }: { envVar: string; poster?: string }) {
  const { t } = useI18n()
  const s = t.ui.project
  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-line bg-surface-2">
      {poster && (
        <img
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px]"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/80 to-surface/40" aria-hidden="true" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent sm:h-16 sm:w-16">
          <Clapperboard size={26} aria-hidden="true" />
        </span>
        <p className="mt-4 font-display text-lg font-medium tracking-tight text-ink sm:text-xl">{s.videoPendingTitle}</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted max-sm:hidden">{s.videoPendingBody}</p>
        <p className="mt-3 text-xs text-muted">
          {s.videoPendingConfig} <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] text-ink">{envVar}</code>
        </p>
      </div>
    </div>
  )
}
