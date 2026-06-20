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
  isOpen: boolean
  open: () => void
  close: () => void
  titleId: string
  descriptionId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext(): DialogContextValue {
  const ctx = useContext(DialogContext)
  if (!ctx) throw new Error('Dialog sub-components must be used inside <Dialog.Root>.')
  return ctx
}

// ─── Focus trap ───────────────────────────────────────────────────────────────

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
}

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isOpen: boolean) {
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement

    // Focus the first focusable element, or the container itself
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
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

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
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isOpen])
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function DialogRoot({ isOpen: controlledOpen, defaultOpen = false, onOpenChange, children }: DialogRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const titleId = useId()
  const descriptionId = useId()

  const open = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true)
    onOpenChange?.(true)
  }, [isControlled, onOpenChange])

  const close = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false)
    onOpenChange?.(false)
  }, [isControlled, onOpenChange])

  return (
    <DialogContext.Provider value={{ isOpen, open, close, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  )
}

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

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent({ children, className, ...rest }, forwardedRef) {
    const { isOpen, close, titleId, descriptionId } = useDialogContext()

    const internalRef = useRef<HTMLDivElement>(null)
    // Merge forwarded ref with internal ref
    const ref = (node: HTMLDivElement | null) => {
      (internalRef as MutableRefObject<HTMLDivElement | null>).current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = node
    }

    const { handleKeyDown } = useFocusTrap(internalRef, isOpen)
    useScrollLock(isOpen)

    if (!isOpen) return null

    return createPortal(
      <>
        {/* Overlay */}
        <div
          className={overlayStyle}
          aria-hidden="true"
          onClick={close}
        />

        {/* Panel */}
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
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
      </>,
      document.body,
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
    const { titleId } = useDialogContext()
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
    const { descriptionId } = useDialogContext()
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
  Trigger:     DialogTrigger,
  Content:     DialogContent,
  Header:      DialogHeader,
  Title:       DialogTitle,
  Description: DialogDescription,
  Footer:      DialogFooter,
  Close:       DialogClose,
}
