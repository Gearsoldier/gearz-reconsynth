import { NextRequest, NextResponse } from 'next/server'
import { runReconPipeline } from '@/lib/recon'

export async function POST(req: NextRequest) {
  const { target } = await req.json()

  if (!target || typeof target !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const output = await runReconPipeline(target)
  return NextResponse.json({ output })
}
