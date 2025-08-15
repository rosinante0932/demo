// src/lib/i18n.ts
import zh from '../i18n/zh.json'
import enRaw from '../i18n/en.json'
import thRaw from '../i18n/th.json'

export const SUPPORTED_LOCALES = ['zh', 'en', 'th'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

// 以 zh 作为基准结构，强校验其他语言
type Dict = typeof zh
export type I18nKey = keyof Dict
const en: Dict = enRaw
const th: Dict = thRaw

const dict: Record<Locale, Dict> = { zh, en, th }

export function t(locale: Locale, key: I18nKey): string {
  return dict[locale][key] ?? key
}

// 解析/兜底：把 string | undefined 收敛为 Locale
export function resolveLocale(input: string | undefined): Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(input ?? '')
    ? (input as Locale)
    : 'zh'
}
