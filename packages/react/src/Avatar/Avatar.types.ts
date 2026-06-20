import type { ImgHTMLAttributes } from 'react'

export type AvatarSize  = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarShape = 'circle' | 'square'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** Image URL. Falls back to initials → generic icon when absent or fails to load. */
  src?: string
  /**
   * Accessible label for the image (required for WCAG 1.1.1).
   * For a decorative avatar next to a visible name, use alt="".
   */
  alt: string
  /** Used to generate initials when `src` is absent or fails to load. */
  name?: string
  size?:  AvatarSize
  shape?: AvatarShape
}
