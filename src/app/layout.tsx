import './globals.css'

export const metadata = {
  title: 'MyVideoTube - YouTube Premium Clone',
  description: 'YouTube Premium Clone Created by DimzM01',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}