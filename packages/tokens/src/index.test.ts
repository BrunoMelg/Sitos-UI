import { describe, it, expect } from 'vitest'
import { vars } from './index'

const CSS_VAR_PATTERN = /^var\(--orchard-[a-z0-9-]+\)$/

describe('vars', () => {
  function collectLeafValues(obj: unknown, path = ''): Array<[string, string]> {
    const entries: Array<[string, string]> = []
    if (typeof obj === 'string') {
      entries.push([path, obj])
    } else if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        entries.push(...collectLeafValues(value, path ? `${path}.${key}` : key))
      }
    }
    return entries
  }

  it('every leaf value is a CSS custom property reference', () => {
    const leaves = collectLeafValues(vars)
    expect(leaves.length).toBeGreaterThan(0)
    for (const [path, value] of leaves) {
      expect(value, `vars.${path}`).toMatch(CSS_VAR_PATTERN)
    }
  })

  it('every CSS var uses the --orchard- prefix', () => {
    const leaves = collectLeafValues(vars)
    for (const [path, value] of leaves) {
      expect(value, `vars.${path}`).toContain('--orchard-')
    }
  })

  describe('color', () => {
    it('has all background tokens', () => {
      expect(vars.color.background.primary).toBeDefined()
      expect(vars.color.background.secondary).toBeDefined()
    })

    it('has all surface tokens', () => {
      expect(vars.color.surface.default).toBeDefined()
      expect(vars.color.surface.raised).toBeDefined()
      expect(vars.color.surface.overlay).toBeDefined()
    })

    it('has all text tokens', () => {
      const textKeys: Array<keyof typeof vars.color.text> = [
        'primary', 'secondary', 'tertiary', 'disabled', 'inverse', 'link',
      ]
      for (const key of textKeys) {
        expect(vars.color.text[key], `color.text.${key}`).toBeDefined()
      }
    })

    it('accent has a foreground token', () => {
      expect(vars.color.accent.foreground).toBeDefined()
      expect(vars.color.accent.foreground).toMatch(CSS_VAR_PATTERN)
    })

    it.each(['success', 'danger', 'warning', 'info'] as const)(
      '%s has default, subtle, emphasis, and foreground tokens',
      (status) => {
        expect(vars.color[status].default).toBeDefined()
        expect(vars.color[status].subtle).toBeDefined()
        expect(vars.color[status].emphasis).toBeDefined()
        expect(vars.color[status].foreground).toBeDefined()
      },
    )
  })

  describe('spacing', () => {
    it('has all scale steps', () => {
      const steps: Array<keyof typeof vars.spacing> = [
        '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl',
      ]
      for (const step of steps) {
        expect(vars.spacing[step], `spacing.${step}`).toBeDefined()
      }
    })
  })

  describe('fontSize', () => {
    it('has all type scale roles', () => {
      const roles: Array<keyof typeof vars.fontSize> = [
        'caption2', 'caption1', 'footnote', 'subheadline', 'callout',
        'body', 'title3', 'title2', 'title1', 'largeTitle',
      ]
      for (const role of roles) {
        expect(vars.fontSize[role], `fontSize.${role}`).toBeDefined()
      }
    })
  })

  describe('duration', () => {
    it('has all motion durations', () => {
      const steps: Array<keyof typeof vars.duration> = [
        'instant', 'fast', 'normal', 'slow', 'deliberate',
      ]
      for (const step of steps) {
        expect(vars.duration[step], `duration.${step}`).toBeDefined()
      }
    })
  })

  describe('easing', () => {
    it('has enter, exit, and inPlace easings', () => {
      expect(vars.easing.enter).toBeDefined()
      expect(vars.easing.exit).toBeDefined()
      expect(vars.easing.inPlace).toBeDefined()
    })
  })

  describe('borderRadius', () => {
    it('has none through full', () => {
      const steps: Array<keyof typeof vars.borderRadius> = [
        'none', 'sm', 'md', 'lg', 'xl', '2xl', 'full',
      ]
      for (const step of steps) {
        expect(vars.borderRadius[step], `borderRadius.${step}`).toBeDefined()
      }
    })
  })

  describe('zIndex', () => {
    it('has all stacking layers', () => {
      const layers: Array<keyof typeof vars.zIndex> = [
        'base', 'raised', 'dropdown', 'sticky', 'overlay', 'modal', 'popover', 'toast',
      ]
      for (const layer of layers) {
        expect(vars.zIndex[layer], `zIndex.${layer}`).toBeDefined()
      }
    })
  })
})
