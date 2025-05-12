import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}

export default async function Layout({
  children,
  params
}: LayoutProps) {
  const { lang } = await params
  const dict = await dictionaries[lang]()

  return (
    <html lang={lang}>
      <body>
        <div className="min-h-screen bg-gray-50">
          <LanguageSwitcher currentLang={lang} dict={dict} />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}