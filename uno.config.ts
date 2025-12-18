import { defineConfig } from '@unocss/vite'
import { presetWind3 } from '@unocss/preset-wind3'
import presetLegacyCompat from '@unocss/preset-legacy-compat'

export default defineConfig({
  presets: [
    presetWind3(),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true
    }),
  ],
})