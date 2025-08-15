# Astro + Vue + UnoCSS + TanStack Query + SSR + SEO + Sitemap + i18n

- **Astro** for content-focused SSR
- **Vue** islands
- **UnoCSS** atomic CSS (no Sass)
- **TanStack Query** for data fetching & caching
- **Built-in i18n** routing (`zh`, `en`, `th`)
- **SEO** best practices (head tags + `hreflang` alternates)
- **Sitemap** (`@astrojs/sitemap`) with i18n alternates

## Quickstart

```bash
pnpm i
pnpm dev
pnpm build
pnpm start
```

Set your production site URL via env:

```bash
SITE_URL=https://your-domain.com pnpm build
```

## Notes

- VueQuery is installed via `appEntrypoint` to work with Astro islands.
- UnoCSS reset is injected (`injectReset: true`). Customize in `uno.config.ts`.
- i18n config lives in `astro.config.mjs`. Pages exist under `src/pages/{locale}/...`.
- Sitemap is localized via `@astrojs/sitemap` `i18n` option.
# demo
