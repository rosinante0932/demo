import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import * as dotenv from 'dotenv'
import vercel from '@astrojs/vercel';

const APP_ENV = process.env.APP_ENV || 'dev'

console.log(APP_ENV, '1111')

const FILE_MAP = {
  dev: '.env.dev',
  test: '.env.test',
  rc: '.env.rc',
  prod: '.env.prod'
}

dotenv.config({ path: FILE_MAP[APP_ENV] })

const SITE_URL = process.env.SITE_URL || 'https://example.com'

import { fileURLToPath } from 'node:url'
const SRC = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  site: SITE_URL,
  output: 'server',
  // adapter: node({ mode: 'standalone' }), // 不要 nodejs
  adapter: vercel({
    // 可选功能示例：
    // isr: true,  // 平台能力；是否使用在页面里 export const revalidate 决定
    imagesConfig: {
      formats: ['image/avif', 'image/webp'],
      sizes: [320, 640, 960, 1200, 1600, 2048],
      // domains: ['img.example.com'],         // 如需远程域名
      minimumCacheTTL: 60
    },
    webAnalytics: { enabled: true }
  }),
  integrations: [
    vue({ appEntrypoint: '/src/pages/_app.ts' }),
    UnoCSS({ injectReset: true, dark: 'class' }),
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en', th: 'th' }
      }
    })
  ],
  i18n: {
    locales: ['zh', 'en', 'th'],
    defaultLocale: 'zh',
    routing: {
      strategy: 'pathname',        // ✅ 改为 pathname
      prefixDefaultLocale: true    // ✅ /zh/... 也有前缀，与你的目录结构一致
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': SRC,
        '~': SRC
      }
    }
  }
})