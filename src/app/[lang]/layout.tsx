import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'


export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dict = await dictionaries[lang]()

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageSwitcher currentLang={lang} dict={dict} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}