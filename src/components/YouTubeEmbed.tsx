import { useState } from 'react'
import { Clapperboard, ExternalLink, Play } from 'lucide-react'
import type { ProjectVideo } from '../types'
import { useI18n } from '../i18n'
import { youtubeEmbedUrl, youtubeWatchUrl } from '../data/video'

/**
 * Click-to-load YouTube player. Shows the poster until the visitor presses play, then swaps in a
 * youtube-nocookie iframe (no third-party request before that). Without a video ID it renders a
 * clearly marked placeholder, never an empty or broken player.
 */
export default function YouTubeEmbed({ video, title }: { video: ProjectVideo; title: string }) {
  const { t } = useI18n()
  const s = t.ui.project
  const [playing, setPlaying] = useState(false)
  const id = video.youtubeId

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lg">
        {id && playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={youtubeEmbedUrl(id)}
            title={s.videoFrameTitle(title)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <img src={video.poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            {id ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/15 focus-visible:outline-none"
                aria-label={s.playVideo(title)}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-ink shadow-xl ring-4 ring-white/30 transition group-hover:scale-105 group-focus-visible:ring-accent sm:h-20 sm:w-20">
                  <Play size={30} aria-hidden="true" className="translate-x-0.5" fill="currentColor" />
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6" role="note">
                <div className="flex items-start gap-3 rounded-xl bg-black/60 p-3 text-white backdrop-blur sm:p-4">
                  <Clapperboard size={22} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold sm:text-base">{s.videoPendingTitle}</p>
                    <p className="mt-1 text-xs leading-5 text-white/80 sm:text-sm">{s.videoPendingBody}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {id && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <span>{s.videoPrivacy}</span>
          <a href={youtubeWatchUrl(id)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-ink underline-offset-4 hover:underline">
            {s.watchOnYouTube} <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only"> {t.ui.common.opensInNewTab}</span>
          </a>
        </div>
      )}
    </div>
  )
}
