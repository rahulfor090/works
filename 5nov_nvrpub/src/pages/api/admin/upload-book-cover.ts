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
    // Define the specific directory for book cover images
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'book_covers')
    
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

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes((file as File).mimetype || '')) {
      // Delete the uploaded file
      fs.unlinkSync((file as File).filepath)
      return res.status(400).json({ 
        message: 'Invalid file type. Only JPG, JPEG, and PNG are allowed.' 
      })
    }

    // Generate unique filename to avoid conflicts
    const timestamp = Date.now()
    const randomNum = Math.round(Math.random() * 1e9)
    const originalName = (file as File).originalFilename || 'book-cover'
    const extension = path.extname(originalName)
    const newFileName = `book-cover-${timestamp}-${randomNum}${extension}`
    
    const oldPath = (file as File).filepath
    const newPath = path.join(uploadDir, newFileName)
    
    // Move file to final location
    fs.renameSync(oldPath, newPath)
    
    // Return ONLY the filename (not the full path)
    return res.status(200).json({
      message: 'File uploaded successfully',
      filename: newFileName,
      path: `/images/book_covers/${newFileName}` // Optional: for preview purposes
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return res.status(500).json({ message: 'Upload failed', error: (error as Error).message })
  }
}
