/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  /** YouTube video id of the Cover Studio demo (11 characters). Empty = placeholder is shown. */
  readonly VITE_COVER_STUDIO_VIDEO_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
