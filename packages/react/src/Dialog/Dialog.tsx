'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
  type MutableRefObject,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Slot } from '@orchard-ui/primitives'
import {
  overlayStyle,
  contentStyle,
  headerStyle,
  titleStyle,
  descriptionStyle,
  footerStyle,
  closeButtonStyle,
} from './Dialog.css'
import type {
  DialogRootProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from './Dialog.types'

// ─── Context ──────────────────────────────────────────────────────────────────

interface DialogContextValue {
  isOpen:               boolean
  open:                 () => void
  close:                () => void
  titleId:              string
  descriptionId:        string
  titleMounted:         boolean
  descriptionMounted:   boolean
  registerTitle:        () => void
  unregisterTitle:      () => void
  registerDescription:  () => void
  unregisterDescription: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('Dialog sub-components must be used inside <Dialog.Root>.')
  return ctx
}

// ─── Focus trap ───────────────────────────────────────────────────────────────

// aria-disabled buttons (Orchard pattern) remain keyboard-focusable by design,
// so exclude them from the trap to prevent Tab stopping on non-interactive controls.
const FOCUSABLE =
  'a[href], ' +
  'button:not([disabled]):not([aria-disabled="true"]), ' +
  'input:not([disabled]), ' +
  'select:not([disabled]), ' +
  'textarea:not([disabled]), ' +
  '[contenteditable]:not([contenteditable="false"]), ' +
  '[tabindex]:not([tabindex="-1"])'

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
}

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isOpen: boolean) {
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement

    const el = containerRef.current
    if (!el) return
    const first = getFocusable(el)[0] ?? el
    first.focus()

    return () => {
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, containerRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key !== 'Tab') return

      const el = containerRef.current
      if (!el) return

      const focusable = getFocusable(el)
      const first     = focusable[0]
      const last      = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    },
    [containerRef],
  )

  return { handleKeyDown }
}

// ─── Scroll lock ─────────────────────────────────────────────────────────────

function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return

    // Compensate scrollbar removal to prevent ~17px layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const original = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingInlineEnd = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = original
      document.body.style.paddingInlineEnd = ''
    }
  }, [isOpen])
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function DialogRoot({
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen       = isControlled ? controlledOpen : uncontrolledOpen

  // Warn once at mount if the consumer passes isOpen without onOpenChange.
  // Without onOpenChange, Escape / overlay-click / close-button all call close()
  // which calls onOpenChange?.(false) — a no-op — leaving the dialog stuck open.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    if (controlledOpen !== undefined && onOpenChange === undefined) {
      // eslint-disable-next-line no-console
      console.warn(
        '[Orchard UI] <Dialog.Root>: `isOpen` is a controlled prop but `onOpenChange` is missing. ' +
        'The dialog cannot close in response to Escape, overlay click, or the close button. ' +
        'Provide `onOpenChange` to handle close events, or use `defaultOpen` for uncontrolled usage.',
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentional — warn once at mount, not on every re-render

  const titleId       = useId()
  const descriptionId = useId()

  const [titleMounted,       setTitleMounted]       = useState(false)
  const [descriptionMounted, setDescriptionMounted] = useState(false)

  const open  = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true)
    onOpenChange?.(true)
  }, [isControlled, onOpenChange])

  const close = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false)
    onOpenChange?.(false)
  }, [isControlled, onOpenChange])

  const registerTitle        = useCallback(() => setTitleMounted(true), [])
  const unregisterTitle      = useCallback(() => setTitleMounted(false), [])
  const registerDescription  = useCallback(() => setDescriptionMounted(true), [])
  const unregisterDescription = useCallback(() => setDescriptionMounted(false), [])

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        open,
        close,
        titleId,
        descriptionId,
        titleMounted,
        descriptionMounted,
        registerTitle,
        unregisterTitle,
        registerDescription,
        unregisterDescription,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

// ─── Portal ───────────────────────────────────────────────────────────────────
// Owns the createPortal call, the SSR guard, and the exit-animation delay.
// EXIT_DURATION_MS must match vars.duration.slow (350ms).

const EXIT_DURATION_MS = 350

function DialogPortal({ children }: DialogPortalProps) {
  const { isOpen } = useDialogContext()

  // SSR guard: never access document on the server
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  // isVisible stays true for EXIT_DURATION_MS after isOpen becomes false
  // so the exit animation has time to play before the portal unmounts.
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      return
    }
    const timer = setTimeout(() => setIsVisible(false), EXIT_DURATION_MS)
    return () => clearTimeout(timer)
  }, [isOpen])

  if (!isMounted || !isVisible) return null

  return createPortal(
    // data-state lets Overlay and Content animate based on open/closed
    <div data-state={isOpen ? 'open' : 'closed'}>
      {children}
    </div>,
    document.body,
  )
}

// ─── Overlay ─────────────────────────────────────────────────────────────────

const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  function DialogOverlay({ className, ...rest }, ref) {
    const { close } = useDialogContext()

    return (
      <div
        ref={ref}
        className={[overlayStyle, className].filter(Boolean).join(' ')}
        aria-hidden="true"
        onClick={close}
        {...rest}
      />
    )
  },
)

// ─── Trigger ─────────────────────────────────────────────────────────────────

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ asChild = false, children, onClick, ...rest }, ref) {
    const { open } = useDialogContext()
    const Comp = (asChild ? Slot : 'button') as ElementType

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        aria-haspopup="dialog"
        onClick={(e: ReactMouseEvent) => {
          onClick?.(e as ReactMouseEvent<HTMLButtonElement>)
          open()
        }}
        {...rest}
      >
        {children}
      </Comp>
    )
  },
)

// ─── Content ─────────────────────────────────────────────────────────────────
// Renders only the panel. createPortal and the overlay live in DialogPortal/DialogOverlay.

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ children, className, ...rest }, forwardedRef) {
    const {
      isOpen,
      close,
      titleId,
      descriptionId,
      titleMounted,
      descriptionMounted,
    } = useDialogContext()

    const internalRef = useRef<HTMLDivElement>(null)
    const ref = (node: HTMLDivElement | null) => {
      (internalRef as MutableRefObject<HTMLDivElement | null>).current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = node
    }

    const { handleKeyDown } = useFocusTrap(internalRef, isOpen)
    useScrollLock(isOpen)

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleMounted ? titleId : undefined}
        aria-describedby={descriptionMounted ? descriptionId : undefined}
        tabIndex={-1}
        className={[contentStyle, className].filter(Boolean).join(' ')}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation()
            close()
            return
          }
          handleKeyDown(e)
        }}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

// ─── Header ───────────────────────────────────────────────────────────────────

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  function DialogHeader({ children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={[headerStyle, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

// ─── Title ────────────────────────────────────────────────────────────────────

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ children, className, ...rest }, ref) {
    const { titleId, registerTitle, unregisterTitle } = useDialogContext()

    useEffect(() => {
      registerTitle()
      return unregisterTitle
    }, [registerTitle, unregisterTitle])

    return (
      <h2
        ref={ref}
        id={titleId}
        className={[titleStyle, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </h2>
    )
  },
)

// ─── Description ─────────────────────────────────────────────────────────────

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ children, className, ...rest }, ref) {
    const { descriptionId, registerDescription, unregisterDescription } = useDialogContext()

    useEffect(() => {
      registerDescription()
      return unregisterDescription
    }, [registerDescription, unregisterDescription])

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={[descriptionStyle, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </p>
    )
  },
)

// ─── Footer ───────────────────────────────────────────────────────────────────

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={[footerStyle, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

// ─── Close ────────────────────────────────────────────────────────────────────

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose({ asChild = false, children, onClick, ...rest }, ref) {
    const { close } = useDialogContext()
    const Comp = (asChild ? Slot : 'button') as ElementType

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        aria-label={children ? undefined : 'Close dialog'}
        className={asChild ? undefined : closeButtonStyle}
        onClick={(e: ReactMouseEvent) => {
          onClick?.(e as ReactMouseEvent<HTMLButtonElement>)
          close()
        }}
        {...rest}
      >
        {children ?? <XIcon />}
      </Comp>
    )
  },
)

// ─── Compound export ──────────────────────────────────────────────────────────

export const Dialog = {
  Root:        DialogRoot,
  Portal:      DialogPortal,
  Overlay:     DialogOverlay,
  Trigger:     DialogTrigger,
  Content:     DialogContent,
  Header:      DialogHeader,
  Title:       DialogTitle,
  Description: DialogDescription,
  Footer:      DialogFooter,
  Close:       DialogClose,
}
