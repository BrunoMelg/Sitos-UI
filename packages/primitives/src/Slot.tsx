import {
  cloneElement,
  forwardRef,
  isValidElement,
  type MutableRefObject,
  type ReactElement,
  type Ref,
} from 'react'

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

/**
 * Renders the child element with the caller's props merged in.
 * Used to implement the asChild pattern: the child element owns the DOM
 * node; the parent contributes behaviour, props, and ref.
 *
 * Merge rules:
 *   - Event handlers are composed (parent fires first, then child)
 *   - className is concatenated (parent + child)
 *   - style objects are spread (parent first, child wins on conflict)
 *   - All other props: child wins over parent
 *   - Refs are composed
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...parentProps }, parentRef) => {
    if (!isValidElement(children)) return null

    const child = children as ReactElement<Record<string, unknown>>
    const childProps = child.props as Record<string, unknown>

    const merged: Record<string, unknown> = {}

    // Start with parent props
    for (const key of Object.keys(parentProps)) {
      merged[key] = (parentProps as Record<string, unknown>)[key]
    }

    // Apply child props, merging special cases
    for (const key of Object.keys(childProps)) {
      if (key === 'style') {
        merged.style = {
          ...(merged.style as object | undefined),
          ...(childProps.style as object | undefined),
        }
      } else if (key === 'className') {
        merged.className =
          [merged.className as string | undefined, childProps.className as string | undefined]
            .filter(Boolean)
            .join(' ') || undefined
      } else if (isHandler(key)) {
        merged[key] = composeHandlers(
          merged[key] as Handler,
          childProps[key] as Handler,
        )
      } else {
        // Child wins
        merged[key] = childProps[key] ?? merged[key]
      }
    }

    return cloneElement(child, {
      ...merged,
      ref: composeRefs(parentRef, (child as { ref?: Ref<unknown> }).ref as Ref<HTMLElement>),
    })
  },
)

Slot.displayName = 'Slot'

// ─── Helpers ────────────────────────────────────────────────────────────────

type Handler = ((...args: unknown[]) => void) | undefined | null

function isHandler(key: string): boolean {
  return /^on[A-Z]/.test(key)
}

function composeHandlers(a: Handler, b: Handler): Handler {
  if (!a) return b
  if (!b) return a
  return (...args: unknown[]) => {
    a(...args)
    b(...args)
  }
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>): Ref<T> {
  const defined = refs.filter(Boolean) as Array<Ref<T>>
  if (defined.length === 1) return defined[0]!
  return (node: T | null) => {
    for (const ref of defined) {
      if (typeof ref === 'function') ref(node)
      else if (ref && typeof ref === 'object')
        (ref as MutableRefObject<T | null>).current = node
    }
  }
}
