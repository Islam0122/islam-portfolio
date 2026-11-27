import { useState } from 'react'
import { Play } from 'lucide-react'
import { useI18n } from '../i18n'

/**
 * Click-to-load YouTube player: shows the thumbnail first and loads the
 * youtube-nocookie iframe only after the visitor presses play.
 */
export default function YouTubeVideo({ id, title, poster }: { id: string; title: string; poster?: string | null }) {
  const { t } = useI18n()
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.75rem] border border-line bg-surface-2 shadow-[var(--shadow)]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={t.ui.project.playVideo(title)}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 to-transparent">
            <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition duration-500 ease-out-expo group-hover:scale-110">
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-accent opacity-30 [animation-duration:2.4s]" />
              <Play size={28} fill="currentColor" aria-hidden="true" className="relative translate-x-0.5" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
