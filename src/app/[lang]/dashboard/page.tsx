import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'
import DashboardView from '@/components/DashboardView'

export default async function DashboardPage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await dictionaries[lang]()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">{dict.dashboard_title}</h1>
      <DashboardView dict={dict} lang={lang} />
    </main>
  )
}