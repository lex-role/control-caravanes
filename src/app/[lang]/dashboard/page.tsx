import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'
import DashboardView from '@/components/DashboardView'

type PageProps = {
  params: Promise<{ lang: Locale }>
}

export default async function DashboardPage(props: PageProps) {
  const params = await props.params
  const dict = await dictionaries[params.lang]()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">{dict.dashboard_title}</h1>
      <DashboardView dict={dict} lang={params.lang} />
    </main>
  )
}