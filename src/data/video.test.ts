import { describe, expect, it } from 'vitest'
import { parseYouTubeId, youtubeEmbedUrl, youtubeWatchUrl } from './video'

describe('parseYouTubeId', () => {
  it('accepts an 11-character YouTube ID', () => {
    expect(parseYouTubeId('abcDEF12345')).toBe('abcDEF12345')
    expect(parseYouTubeId('  a_b-C1d2E3f  ')).toBe('a_b-C1d2E3f')
  })

  it('rejects empty, placeholder and malformed values', () => {
    for (const v of [undefined, null, '', 'OKURMENKIDS_YOUTUBE_VIDEO_ID', 'https://youtu.be/abcDEF12345', 'short', 'has space12']) {
      expect(parseYouTubeId(v), String(v)).toBeNull()
    }
  })

  it('builds privacy-enhanced embed and watch URLs', () => {
    expect(youtubeEmbedUrl('abcDEF12345')).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/abcDEF12345\?/)
    expect(youtubeWatchUrl('abcDEF12345')).toBe('https://www.youtube.com/watch?v=abcDEF12345')
  })
})
