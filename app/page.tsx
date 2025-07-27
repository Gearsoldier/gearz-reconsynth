'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const handleRecon = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResult('')

    try {
      const res = await fetch('/api/recon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: input }),
      })

      const data = await res.json()
      setResult(data.output)
    } catch (err) {
      setResult('❌ Error running recon.')
    }

    setLoading(false)
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center text-white px-4 py-10 flex flex-col items-center justify-start"
      style={{ backgroundImage: "url('/recon-bg.png')" }}
    >
      <div className="container mx-auto max-w-3xl text-center bg-black/60 p-6 rounded-xl">
        <h1 className="text-4xl font-bold mb-6 text-green-400 font-mono tracking-wide">
          GEARZ ReconSynth
        </h1>

        <input
          type="text"
          placeholder="Enter domain or company name"
          className="px-4 py-2 rounded w-full text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleRecon}
          disabled={loading}
          className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
        >
          {loading ? '🧠 Scanning…' : '⚙️ Begin Recon'}
        </button>

        {loading && <div className="mt-4 animate-pulse text-sm text-green-300">Running toolchain…</div>}

        {result && (
          <div className="mt-8 p-4 bg-gray-950/80 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap break-words font-mono max-h-[500px]">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  )
}
