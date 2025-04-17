export const defaultLocale = 'ca'

export const locales = ['ca', 'es', 'en', 'fr', 'oc'] as const
export type Locale = typeof locales[number]

export const dictionaries = {
  ca: () => import('../dictionaries/ca.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  fr: () => import('../dictionaries/fr.json').then((module) => module.default),
  oc: () => import('../dictionaries/oc.json').then((module) => module.default),
}