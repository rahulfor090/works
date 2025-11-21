import type { NextApiRequest, NextApiResponse } from 'next'
import { loadLocalBooks } from '@/utils/local-books'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const books = await loadLocalBooks()
        return res.status(200).json({ count: books.length })
    } catch (error) {
        console.error('Failed to count books:', error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
