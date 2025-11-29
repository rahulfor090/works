import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { text } = req.body

    if (!text) {
        return res.status(400).json({ message: 'Missing text to summarize' })
    }

    // Resolve API key: prefer env, else try config/gemini.json { "apiKey": "..." }
    let apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        try {
            const cfgPath = path.join(process.cwd(), 'config', 'gemini.json')
            if (fs.existsSync(cfgPath)) {
                const raw = fs.readFileSync(cfgPath, 'utf-8')
                const parsed = JSON.parse(raw)
                if (parsed.apiKey && typeof parsed.apiKey === 'string' && parsed.apiKey.trim().length > 0) {
                    apiKey = parsed.apiKey.trim()
                }
            }
        } catch (e) {
            // Silent fallback, will error below if still missing
        }
    }
    if (!apiKey) {
        return res.status(500).json({ message: 'Gemini API key not configured (set GEMINI_API_KEY or config/gemini.json)' })
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

        // Shortened prompt to reduce token usage
        const prompt = `Summarize this text concisely:\n\n${text}`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const summary = response.text()

        return res.status(200).json({ summary })
    } catch (error: any) {
        console.error('Gemini API Error:', error)
        return res.status(500).json({ message: error.message || 'Failed to generate summary' })
    }
}
