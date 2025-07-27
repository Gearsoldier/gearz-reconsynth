import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GEARZ ReconSynth',
  description: 'AI-powered OSINT recon engine for bug bounty hunters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body
        className="bg-black text-white bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: "url('/recon-bg.png')",
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="backdrop-blur-sm bg-black/70 min-h-screen">
          <main className="container mx-auto px-4 py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
