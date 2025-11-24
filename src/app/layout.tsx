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
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}