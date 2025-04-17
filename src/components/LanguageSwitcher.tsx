'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales } from '@/config/i18n'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1]

  return (
    <div className="flex space-x-4">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathname.substring(3)}`}
          className={`px-4 py-2 rounded ${
            currentLocale === locale ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}