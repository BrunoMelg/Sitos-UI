'use client'

import { forwardRef, useState } from 'react'
import { avatarRecipe, avatarImgStyle } from './Avatar.css'
import type { AvatarProps } from './Avatar.types'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Simple SVG person icon — used when neither src nor name is available.
const PersonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    width="55%"
    height="55%"
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
)

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar({ src, alt, name, size, shape, className, ...rest }, ref) {
    const [imgError, setImgError] = useState(false)
    const showImage    = Boolean(src) && !imgError
    const showInitials = !showImage && Boolean(name)

    // When showing the native <img>, the img's alt= provides the accessible name.
    // role="img" + aria-label is only needed on the wrapper when no native img is present.
    const wrapperRole      = !showImage && alt ? ('img' as const) : undefined
    const wrapperAriaLabel = !showImage && alt ? alt : undefined
    const wrapperAriaHidden = !showImage && !alt ? (true as const) : undefined

    return (
      <span
        ref={ref}
        role={wrapperRole}
        aria-label={wrapperAriaLabel}
        aria-hidden={wrapperAriaHidden}
        className={[avatarRecipe({ size, shape }), className].filter(Boolean).join(' ')}
        {...rest}
      >
        {showImage && (
          <img
            src={src}
            alt={alt}
            className={avatarImgStyle}
            onError={() => setImgError(true)}
          />
        )}
        {!showImage && showInitials && getInitials(name!)}
        {!showImage && !showInitials && <PersonIcon />}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
