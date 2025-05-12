import RegistrationForm from '@/components/RegistrationForm'
import { Locale } from '@/config/i18n'
import { dictionaries } from '@/config/i18n'
import Image from 'next/image'
import signalImage from '@/images/signal.png'

type PageProps = {
  params: Promise<{ lang: Locale }>
}

export default async function Home(props: PageProps) {
  const params = await props.params
  const dict = await dictionaries[params.lang]()

  return (
    <main className="flex flex-col items-center justify-top min-h-screen max-h-screen bg-gray-100">
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <div className="mb-8">
          <Image
            src={signalImage}
            alt="Señal de caravanas"
            width={192}
            height={192}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
          {dict.title}
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {dict.description}
        </p>
        <RegistrationForm dict={dict} lang={params.lang} />
      </div>
    </main>
  )
}