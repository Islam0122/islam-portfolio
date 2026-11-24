/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  /** YouTube video ID of the OkurmenKIDS showcase (11 characters). Empty = placeholder. */
  readonly VITE_OKURMENKIDS_YOUTUBE_VIDEO_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
