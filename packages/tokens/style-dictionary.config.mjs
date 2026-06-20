import StyleDictionary from 'style-dictionary'
import { mkdirSync } from 'fs'

mkdirSync('dist', { recursive: true })

const primitiveSource = [
  'src/primitive/color.json',
  'src/primitive/spacing.json',
  'src/primitive/typography.json',
  'src/primitive/motion.json',
  'src/primitive/radius.json',
  'src/primitive/shadow.json',
  'src/primitive/z-index.json',
]

// Build 1: light theme — all primitives + semantic light colors
// Emits dist/tokens.css as the base stylesheet (:root and [data-theme="light"])
const sdLight = new StyleDictionary({
  source: [...primitiveSource, 'src/semantic/light.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'orchard',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: ':root, [data-theme="light"]',
            outputReferences: false,
          },
          // Exclude raw primitive colors — expose only semantic + other primitive tokens
          filter: (token) => !token.filePath.endsWith('color.json'),
        },
      ],
    },
  },
})

// Build 2: dark theme — only semantic dark color overrides
// Emits dist/tokens-dark.css as a theme override ([data-theme="dark"])
const sdDark = new StyleDictionary({
  source: [...primitiveSource, 'src/semantic/dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'orchard',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: false,
          },
          filter: (token) => token.filePath.endsWith('dark.json'),
        },
      ],
    },
  },
})

await sdLight.buildAllPlatforms()
await sdDark.buildAllPlatforms()

console.log('✓ Orchard tokens built successfully')
