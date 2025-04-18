'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, Locale } from '@/config/i18n'

type LanguageSwitcherProps = {
  currentLang: Locale
  dict: {
      dashboard_button: string
      exit_button: string
  }
}

export default function LanguageSwitcher({ currentLang, dict }: LanguageSwitcherProps) {
    const pathname = usePathname()
    const isDashboard = pathname.includes('/dashboard')

  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}${pathname.replace(/^\/[^/]+/, '')}`}
              className={`px-4 py-2 rounded transition-colors ${
                currentLang === locale 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
              <Link
                  href={isDashboard ? `/${currentLang}` : `/${currentLang}/dashboard`}
                  className={`px-6 py-2 text-white rounded transition-colors ${isDashboard
                          ? 'bg-orange-700 hover:bg-orange-800'
                          : 'bg-teal-500 hover:bg-teal-600'
                      }`}
              >
                  {isDashboard ? dict.exit_button : dict.dashboard_button}
              </Link>
      </nav>
    </header>
  )
}