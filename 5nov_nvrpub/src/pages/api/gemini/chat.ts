import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'

// Basic in-memory rate limit (per process). Not persistent.
const recentCalls: Record<string, number[]> = {}
const WINDOW_MS = 60_000
const MAX_CALLS = 15

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  const { messages } = req.body as { messages?: { role: 'user' | 'assistant'; content: string }[] }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ message: 'Missing messages array' })
  }

  // Simple rate limit per IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  recentCalls[ip] = (recentCalls[ip] || []).filter(ts => now - ts < WINDOW_MS)
  if (recentCalls[ip].length >= MAX_CALLS) {
    return res.status(429).json({ message: 'Too many requests, slow down.' })
  }
  recentCalls[ip].push(now)

  // Resolve API key
  let apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    try {
      const cfgPath = path.join(process.cwd(), 'config', 'gemini.json')
      if (fs.existsSync(cfgPath)) {
        const raw = fs.readFileSync(cfgPath, 'utf-8')
        const parsed = JSON.parse(raw)
        if (parsed.apiKey && typeof parsed.apiKey === 'string') apiKey = parsed.apiKey.trim()
      }
    } catch {}
  }
  if (!apiKey) return res.status(500).json({ message: 'Gemini API key not configured (set GEMINI_API_KEY or config/gemini.json)' })

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    // Construct prompt from last N messages to keep within size
    const MAX_CONTEXT = 8
    const contextSlice = messages.slice(-MAX_CONTEXT)
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const systemPreamble = 'You are an educational assistant helping summarize and clarify textbook chapter content. Be concise and helpful.'
    const prompt = `${systemPreamble}\n\nConversation:\n${contextSlice}\n\nAssistant:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return res.status(200).json({ message: text })
  } catch (error: any) {
    console.error('Gemini Chat Error:', error)
    return res.status(500).json({ message: error.message || 'Failed to generate chat response' })
  }
}
