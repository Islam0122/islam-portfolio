/*
 * YouTube video of the OkurmenKIDS showcase.
 *
 * Set VITE_OKURMENKIDS_YOUTUBE_VIDEO_ID (the 11-character ID from the YouTube URL, e.g. the part after
 * "watch?v=") in .env or in the hosting provider's environment variables. Until it is set, the project page
 * and card show a clearly marked placeholder instead of a player, so no broken or invented link is published.
 */
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/

/** Returns a valid YouTube video ID, or null for empty, placeholder or malformed values. */
export function parseYouTubeId(value: string | undefined | null): string | null {
  const id = (value ?? '').trim()
  return YOUTUBE_ID.test(id) ? id : null
}

export const OKURMENKIDS_YOUTUBE_VIDEO_ID: string | null = parseYouTubeId(import.meta.env.VITE_OKURMENKIDS_YOUTUBE_VIDEO_ID)

export const youtubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
export const youtubeWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`
