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
            <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex justify-between w-full sm:w-auto sm:gap-2">
                    {locales.map((locale) => (
                        <Link
                            key={locale}
                            href={`/${locale}${pathname.replace(/^\/[^/]+/, '')}`}
                            className={`flex items-center justify-center p-2 rounded text-sm transition-colors ${
                                currentLang === locale 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-400 hover:bg-gray-500'
                            }`}
                        >
                            {locale.toUpperCase()}
                        </Link>
                    ))}
                </div>
                <Link
                    href={isDashboard ? `/${currentLang}` : `/${currentLang}/dashboard`}
                    className={`w-full sm:w-auto text-center px-6 py-2 text-white rounded transition-colors ${
                        isDashboard
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-teal-500 hover:bg-teal-600'
                    }`}
                >
                    {isDashboard ? dict.exit_button : dict.dashboard_button}
                </Link>
            </nav>
        </header>
    )
}