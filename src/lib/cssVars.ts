import type { CSSProperties } from 'react'

/** Typed helper for inline CSS custom properties, e.g. style={cssVars({ '--i': 2 })}. */
export function cssVars(vars: Record<`--${string}`, string | number>, extra: CSSProperties = {}): CSSProperties {
  return { ...(vars as CSSProperties), ...extra }
}
