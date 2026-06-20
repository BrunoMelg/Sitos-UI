import baseConfig from '@orchard-ui/eslint-config'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/.turbo/**',
      '**/coverage/**',
    ],
  },
  ...baseConfig,
]
