import { defineConfig, presetUno, presetAttributify, presetIcons, transformerVariantGroup, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons()
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives()
  ],
  safelist: 'container prose mx-auto text-center grid grid-cols-1 md:grid-cols-2 gap-4'.split(' ')
})
