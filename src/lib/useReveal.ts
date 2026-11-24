import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element once it scrolls into view (adds `is-visible` via the returned flag).
 * Without IntersectionObserver the element is visible immediately. Motion itself is CSS
 * (`.reveal`), so prefers-reduced-motion is handled there.
 */
export function useReveal<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return { ref, visible }
}
