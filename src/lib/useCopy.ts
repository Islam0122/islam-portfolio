import { useCallback, useEffect, useRef, useState } from 'react'

/** Copies text to the clipboard and reports `copied` for a short moment. Falls back silently if blocked. */
export function useCopy(timeout = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(false), timeout)
      } catch {
        // Clipboard can be unavailable (insecure context, permissions). The mailto link still works.
      }
    },
    [timeout],
  )

  return { copied, copy }
}
