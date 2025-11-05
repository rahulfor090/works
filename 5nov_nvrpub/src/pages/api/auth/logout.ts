import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Clear the cookie
    res.setHeader('Set-Cookie', 'admin-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict')
    
    return res.status(200).json({ success: true })
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}
