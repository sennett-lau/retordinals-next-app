import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '../components/common/footer/Footer'
import Header from '../components/common/header/Header'
import { SITE_URL } from '../config/general'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RETkhronizer - Banner Creator | Retoridinals',
  description: '4269 Retordinals spawned from the Bitcoin Blockchain',
  applicationName: 'RETkhronizer',
  authors: [{ name: 'Retordinals' }, { name: 'Sennett Lau (Capyyy)', url: 'https://sennettlau.me' }],
  generator: 'Next.js',
  keywords: ['Retordinals', 'BTC', 'Inscriptions', 'Ordinals'],
  viewport: 'width=device-width, initial-scale=1.0',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
    },
  },
  icons: [`${SITE_URL}/logo-pack/logo_128.png`],
  openGraph: {
    title: 'RETkhronizer - Banner Creator | Retoridinals',
    description: '4269 Retordinals spawned from the Bitcoin Blockchain',
    images: [
      {
        url: `${SITE_URL}/banner.png`,
        alt: 'Retordinals',
        width: 3840,
        height: 2160,
      },
    ],
  },
  twitter: {
    title: '4269 Retordinals spawned from the Bitcoin Blockchain',
    images: {
      url: `${SITE_URL}/banner.png`,
      alt: 'Retordinals',
      width: 3840,
      height: 2160,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <main className='flex min-h-screen flex-col items-center justify-between bg-v1_dark'>
          <div className='flex min-h-screen flex-col items-center justify-between w-full backdrop-blur-sm'>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  )
}
