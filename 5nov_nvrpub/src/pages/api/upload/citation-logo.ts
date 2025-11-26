import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm, File } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public', 'uploads', 'citations'),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    })

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'citations')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now()
    const originalName = (file as File).originalFilename || 'citation-logo'
    const extension = path.extname(originalName)
    const baseName = path.basename(originalName, extension).replace(/[^a-zA-Z0-9]/g, '-')
    const newFileName = `${baseName}-${timestamp}${extension}`
    
    const oldPath = (file as File).filepath
    const newPath = path.join(uploadDir, newFileName)
    
    // Move file to final location
    fs.renameSync(oldPath, newPath)
    
    // Return the public URL
    const publicUrl = `/uploads/citations/${newFileName}`
    
    return res.status(200).json({
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: newFileName
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'Upload failed', error: (error as Error).message })
  }
}
