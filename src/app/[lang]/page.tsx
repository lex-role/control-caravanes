import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = await dictionaries[lang]()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{dict.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{dict.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {dict.register_button}
      </button>
    </main>
  )
}