import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const { text } = req.body

    if (!text) {
        return res.status(400).json({ message: 'Missing text to summarize' })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        return res.status(500).json({ message: 'Gemini API key not configured' })
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
