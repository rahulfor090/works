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
    // Define the specific directory for slider images
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'sliders')
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = new IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    })

    const [fields, files] = await form.parse(req)
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now()
    const randomNum = Math.round(Math.random() * 1e9)
    const originalName = (file as File).originalFilename || 'slider'
    const extension = path.extname(originalName)
    const newFileName = `slider-${timestamp}-${randomNum}${extension}`
    
    const oldPath = (file as File).filepath
    const newPath = path.join(uploadDir, newFileName)
    
    // Move file to final location
    fs.renameSync(oldPath, newPath)
    
    // Return ONLY the filename (not the full path)
    // The frontend will construct the path as needed
    return res.status(200).json({
      message: 'File uploaded successfully',
      filename: newFileName,
      path: `/images/sliders/${newFileName}` // Optional: for preview purposes
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'Upload failed', error: (error as Error).message })
  }
}