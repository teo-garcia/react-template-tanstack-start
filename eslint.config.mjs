import base from '@teo-garcia/eslint-config-shared/base'
import playwright from '@teo-garcia/eslint-config-shared/playwright'
import react from '@teo-garcia/eslint-config-shared/react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { ignores: ['src/routeTree.gen.ts', '.output/**'] },
  ...base,
  ...react,
  ...playwright,
])
