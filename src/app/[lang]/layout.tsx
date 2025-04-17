import { Locale, locales } from '@/config/i18n'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default function Layout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}