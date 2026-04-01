import base from '@teo-garcia/eslint-config-shared/base'
import playwright from '@teo-garcia/eslint-config-shared/playwright'
import react from '@teo-garcia/eslint-config-shared/react'

export default [
  { ignores: ['src/routeTree.gen.ts', '.output/**'] },
  ...base,
  ...react,
  ...playwright,
]
