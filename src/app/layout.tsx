import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'misopog',
  description: 'professional dumbass',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen text-white overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 bg-image opacity-20" />
        <main className="flex items-center justify-center p-4 min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  )
}

