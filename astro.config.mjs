import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sitemap from '@astrojs/sitemap'
import UnoCSS from 'unocss/astro'
import vercel from '@astrojs/vercel';
import AutoImport from 'unplugin-auto-import/vite'

const APP_ENV = process.env.APP_ENV || 'dev'

console.log(APP_ENV, '当前环境')

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
    UnoCSS({
      injectReset: true, //dark: 'class' 
    }),
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-CN', en: 'en', th: 'th', km: 'km', ko: 'ko', vi: 'vi' }
      }
    })
  ],
  i18n: {
    locales: ['zh', 'en', 'th', 'km', 'ko', 'vi'],
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
    },
    plugins: [
      AutoImport({
        // 这里既可以导入函数，也可以导入“type 类型”
        imports: [
          // 例：如果你也想自动引入 vue 的 ref、computed 等
          'vue',
          'pinia',
          {
            '@tanstack/vue-query': [
              'useQuery',
              'useMutation',
              'useQueryClient',
              'QueryClient',
              'VueQueryPlugin',
            ],
          },
        ],
        dts: 'src/auto-imports.d.ts',         // 生成声明文件，给 TS 用
        eslintrc: { enabled: true },          // 可选：生成 ESLint 配置，避免 “未定义” 报错
      }),
    ],
  }
})